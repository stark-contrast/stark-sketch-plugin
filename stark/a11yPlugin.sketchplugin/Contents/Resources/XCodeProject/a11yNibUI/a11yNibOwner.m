#import <Cocoa/Cocoa.h>

@interface A11yNibOwner : NSObject


/* View bindings go here */
@property IBOutlet NSWindow *mainWindow;
@property IBOutlet WebView *webMainView;
@property IBOutlet NSButton *btnNormalColor;
@property IBOutlet NSButton *btnProtanopia;
@property IBOutlet NSButton *btnProtanomaly;
@property IBOutlet NSButton *btnDeuteranopia;
@property IBOutlet NSButton *btnDeuteranomaly;
@property IBOutlet NSButton *btnTritanopia;
@property IBOutlet NSButton *btnTritanomaly;
@property IBOutlet NSButton *btnAchromatopsia;
@property IBOutlet NSButton *btnAchromatomaly;
/* End of view bindings */


@end

@implementation A11yNibOwner
@end
