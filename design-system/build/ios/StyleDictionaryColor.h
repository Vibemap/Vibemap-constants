
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Thu, 14 May 2020 18:29:56 GMT
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorBaseWhite,
ColorBaseBlack,
ColorBaseGray50,
ColorBaseGray100,
ColorBaseGray200,
ColorBaseGray300,
ColorBaseGray400,
ColorBaseGray500,
ColorBaseGray600,
ColorBaseGray700,
ColorBaseGray800,
ColorBaseGray900,
ColorBaseGray1000,
ColorBaseYellowBright,
ColorBaseYellowDeep,
ColorBaseYellowLight,
ColorBaseYellowPrimary,
ColorBaseLimeBright,
ColorBaseLimeDeep,
ColorBaseLimeLight,
ColorBaseLimePrimary,
ColorBaseGreenBright,
ColorBaseGreenDeep,
ColorBaseGreenLight,
ColorBaseGreenPrimary,
ColorBaseTealBright,
ColorBaseTealDeep,
ColorBaseTealLight,
ColorBaseTealPrimary,
ColorBaseBlueBright,
ColorBaseBlueDeep,
ColorBaseBlueLight,
ColorBaseBluePrimary,
ColorBaseVioletBright,
ColorBaseVioletDeep,
ColorBaseVioletLight,
ColorBaseVioletPrimary,
ColorBasePurpleBright,
ColorBasePurpleDeep,
ColorBasePurpleLight,
ColorBasePurplePrimary,
ColorBaseMagentaBright,
ColorBaseMagentaDeep,
ColorBaseMagentaLight,
ColorBaseMagentaPrimary,
ColorBaseRedBright,
ColorBaseRedDeep,
ColorBaseRedLight,
ColorBaseRedPrimary,
ColorBaseOrangeBright,
ColorBaseOrangeDeep,
ColorBaseOrangeLight,
ColorBaseOrangePrimary,
ColorBaseGoldenBright,
ColorBaseGoldenDeep,
ColorBaseGoldenLight,
ColorBaseGoldenPrimary,
ColorGradientsQuietEnergy
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
