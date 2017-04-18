@import 'utils/nibui.js';
@import 'utils/checker.js';

var COSCRIPT;
var artboardId = "abid_UseWindow";

var onRun = function(context) {
  var app = NSApplication.sharedApplication();

  // Prepare the NIB so we can do stuff with the UI
  COSCRIPT = COScript.currentCOScript();
  COSCRIPT.setShouldKeepAround(true);
  var nibui = new NibUI(context, 'UIBundle', 'a11yNibUITemplate', [
    'mainWindow', 'webMainView'
  ]);

  // This kicks out a js file that the webview can access to show
  // a the list of artboards in the doc
  generateArtboardNames(context);

  //
  // Style up the window view
  nibui.mainWindow.setOpaque(false);
  var transparent = [NSColor colorWithDeviceRed:0.0 green:0.0 blue:0.0 alpha:0.25];
  nibui.mainWindow.setBackgroundColor(transparent);

  // Load the webview and then style it so the window part of it can be
  // transparent for the user to see through
  var localWebURL = context.plugin.urlForResourceNamed('Web/index.html');
  var request = [NSURLRequest requestWithURL:localWebURL
    cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData
    timeoutInterval:60];
  nibui.webMainView.mainFrame().loadRequest(request);
  nibui.webMainView.wantsLayer = true;
  nibui.webMainView.setDrawsBackground(false);
  var webViewLayer = nibui.webMainView.layer();
  nibui.webMainView.hidden = false;

  //
  // Set up the webview to handle statustext updates (events) posted
  var webUIDelegate = createCocoaObject({
    'webView:setStatusText:': function(webView, statusText) {
      if (statusText.startsWith("abid_")) {
        handleArtboardSelectChange(context, nibui, statusText);
      } else if (statusText.startsWith("data:image")){
        handleExportButtonClick(statusText);
      } else if (statusText == 'Check') {
        handleCheckContrastButtonClick(context, nibui);
      } else if (statusText == 'nav-contrast') {
        resizeWindow(nibui, 551, 623);
        var mainWindow = nibui.mainWindow;
        [mainWindow setStyleMask:[mainWindow styleMask] & ~NSResizableWindowMask];
      } else if (statusText == 'nav-color') {
        var mainWindow = nibui.mainWindow;
        [mainWindow setStyleMask:[mainWindow styleMask] | NSResizableWindowMask];

        if (artboardId == 'abid_UseWindow') {
          takeSnapshot(context, nibui);
          postWebFunction(nibui, "runSimulation", [""]);
        }
      } else if (statusText == 'LogoClicked') {
        handleLogoButtonClicked();
      }
    }
  });
  nibui.webMainView.setUIDelegate(webUIDelegate);

  //
  // Set up window to respond to move/resize events
  var windowUIDelegate = createCocoaObject({
    'windowWillStartLiveResize:': function(notification) {
      if (artboardId == "abid_UseWindow") {
        postWebFunction(nibui, "removeCanvasOpacity", [""]);
      }
    },
    'windowDidEndLiveResize:': function(notification) {
      if (artboardId == "abid_UseWindow") {
        takeSnapshot(context, nibui);
        postWebFunction(nibui, "runSimulation", [""]);
      }
    },
    'windowWillMove:': function(notification) {
      if (artboardId == "abid_UseWindow") {
        postWebFunction(nibui, "removeCanvasOpacity", [""]);
      }
    },
    'windowDidMove:': function(notification) {
      if (artboardId == "abid_UseWindow") {
        takeSnapshot(context, nibui);
        postWebFunction(nibui, "runSimulation", [""]);
      }
    },
  });
  nibui.mainWindow.setDelegate(windowUIDelegate);

  //
  // Make the window on top and keep it there
  nibui.mainWindow.makeKeyAndOrderFront(null);
  nibui.mainWindow.setLevel(NSFloatingWindowLevel);
  nibui.destroy();

  // Take a snapshot of the window so it's ready if the users selects a
  // colorblind type to simulate
  takeSnapshot(context, nibui);
}

function handleArtboardSelectChange(context, nibui, artboardSelectId) {
  artboardId = artboardSelectId;

  if (artboardId != "abid_UseWindow") {
    var doc = context.document;
    var page = [doc currentPage];
    var artboards = [[doc currentPage] artboards];

    for (var i = 0; i < artboards.count(); i++) {
      if (artboards[i].name() == artboardId.replace("abid_", "")) {
        var artboardToSave = artboards[i];

        var filePath = "/Resources/Web/img/snapshot.png";
        var scriptPath = context.scriptPath.stringByDeletingLastPathComponent();
        scriptPath = scriptPath.stringByDeletingLastPathComponent() + filePath;

        var slice = [[MSExportRequest exportRequestsFromExportableLayer:artboardToSave] firstObject];

        [slice setShouldTrim:0];
        [slice setScale:2];

        [doc saveArtboardOrSlice:slice toFile:scriptPath];
      }
    }
  } else {
    takeSnapshot(context, nibui);
  }

  postWebFunction(nibui, "runSimulation", [""]);
}

function handleCheckContrastButtonClick(context, nibui) {
  var returnValue = checkContrast(context);
  postWebFunction(nibui, "updateCheckerOutput", [returnValue]);
}

function handleExportButtonClick(imageDataString) {
  var url = [NSURL URLWithString:imageDataString];
  var imageData = [NSData dataWithContentsOfURL:url];
  var snapshot = [[NSBitmapImageRep alloc] initWithData:imageData];

  var panel = [NSSavePanel savePanel];
  [panel setTitle:"Choose where to save your colorblind simulation image:"];
  [panel setAllowsOtherFileTypes:false];
  [panel setExtensionHidden:false];
  [panel setCanCreateDirectories:true];
  [panel setNameFieldStringValue:"simulation"];

  if ([panel runModal] == NSOKButton) {
    var message = [panel filename];
    var data = [snapshot representationUsingType:NSPNGFileType properties:nil];
    var filepath = message + '.png';
    var file = [NSString stringWithFormat:@"%@", filepath];
    var fileSuccess = [data writeToFile:file atomically:true];
  }
}

function handleLogoButtonClicked() {
  var url = "https://www.getstark.co";
	[[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString: url]]
}

function generateArtboardNames(context) {
  var doc = context.document;
  var page = [doc currentPage];
  var artboards = [[doc currentPage] artboards];
  var artboardNames = "var artboardNames = [";

  for (var i = artboards.count() - 1; i >= 0; i--) {
    artboardNames += "\"" + artboards[i].name() + "\",";
  }

  artboardNames += "];"

  var data = [NSString stringWithFormat:@"%@", artboardNames];

  saveFile(context, '/Resources/Web/js/artboard-names.js', data);
}

function takeSnapshot(context, nibui) {
  var webViewFrame = nibui.webMainView.frame();
  var webViewWindow = nibui.webMainView.window();

  var screenHeight = [[NSScreen mainScreen] frame].size.height;

  var frameRelativeToScreen = [webViewWindow convertRectToScreen:webViewFrame];
  frameRelativeToScreen.size.width = frameRelativeToScreen.size.width - 220;
  frameRelativeToScreen.origin.y = screenHeight - webViewFrame.size.height - frameRelativeToScreen.origin.y;

  var quartzSnapshot = CGWindowListCreateImage(
      frameRelativeToScreen,
      kCGWindowListOptionOnScreenBelowWindow,
      webViewWindow.windowNumber(),
      kCGWindowImageBestResolution);

  var snapshot = [[NSBitmapImageRep alloc] initWithCGImage:quartzSnapshot];
  var data = [snapshot representationUsingType:NSPNGFileType properties:nil];

  saveFile(context, '/Resources/Web/img/snapshot.png', data);

  // release previous screen capture, first the NSBitmapImageRep then the CGImage
  if (snapshot != null) {
    [snapshot release];
  }
  if (quartzSnapshot != null) {
    CGImageRelease(quartzSnapshot);
  }
}

function postWebFunction(nibui, functionName, functionArguments) {
  var webView = nibui.webMainView;
  var script = webView.windowScriptObject();
  script.callWebScriptMethod_withArguments_(functionName, functionArguments);
}

function saveFile(context, filePath, data) {
  var scriptPath = context.scriptPath.stringByDeletingLastPathComponent();
  scriptPath = scriptPath.stringByDeletingLastPathComponent() + filePath;

  var file = [NSString stringWithFormat:@"%@", scriptPath];
  var fileSuccess = [data writeToFile:file atomically:true];
}

function resizeWindow(nibui, width, height) {
  var mainWindow = nibui.mainWindow;
  var frame = [mainWindow frame];
  var oldWidth = frame.size.width;
  var oldHeight = frame.size.height;
  frame.size.width = width;
  frame.size.height = height;

  frame.origin.x += oldWidth - width;
  frame.origin.y += oldHeight - height;

  [mainWindow setFrame:frame display:true animate:true];
}
