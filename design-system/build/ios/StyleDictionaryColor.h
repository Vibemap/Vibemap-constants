
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Thu, 07 May 2020 04:10:08 GMT
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorBaseGrayLight,
ColorBaseGrayMedium,
ColorBaseGrayDark,
ColorBaseRed,
ColorBaseGreen
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
