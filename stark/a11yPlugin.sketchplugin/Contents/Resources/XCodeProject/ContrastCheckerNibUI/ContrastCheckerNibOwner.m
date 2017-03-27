#import <Cocoa/Cocoa.h>

@interface ContrastCheckerNibOwner : NSObject


/* View bindings go here */
@property IBOutlet NSWindow *mainWindow;
@property IBOutlet NSBox *clrLeft;
@property IBOutlet NSBox *clrRight;
@property IBOutlet NSTextField *lblNormalLeft;
@property IBOutlet NSTextField *lblLargeBoldLeft;
@property IBOutlet NSTextField *lblLargeLeft;
@property IBOutlet NSTextField *lblNormalRight;
@property IBOutlet NSTextField *lblLargeBoldRight;
@property IBOutlet NSTextField *lblLargeRight;
@property IBOutlet NSTextField *lblContrastValue;
@property IBOutlet NSTextField *lblNormalDoubleStatus;
@property IBOutlet NSTextField *lblNormalTripleStatus;
@property IBOutlet NSTextField *lblLargeBoldDoubleStatus;
@property IBOutlet NSTextField *lblLargeBoldTripleStatus;
@property IBOutlet NSTextField *lblLargeDoubleStatus;
@property IBOutlet NSTextField *lblLargeTripleStatus;
/* End of view bindings */


@end

@implementation ContrastCheckerNibOwner
@end
