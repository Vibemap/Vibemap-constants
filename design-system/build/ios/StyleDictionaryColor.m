
//
// StyleDictionaryColor.m
//
// Do not edit directly
// Generated on Mon, 18 May 2020 23:08:58 GMT
//

#import "StyleDictionaryColor.h"


@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.976f green:0.969f blue:0.988f alpha:1.000f],
[UIColor colorWithRed:0.937f green:0.937f blue:0.957f alpha:1.000f],
[UIColor colorWithRed:0.886f green:0.886f blue:0.929f alpha:1.000f],
[UIColor colorWithRed:0.894f green:0.894f blue:0.918f alpha:1.000f],
[UIColor colorWithRed:0.820f green:0.816f blue:0.847f alpha:1.000f],
[UIColor colorWithRed:0.698f green:0.694f blue:0.737f alpha:1.000f],
[UIColor colorWithRed:0.600f green:0.600f blue:0.639f alpha:1.000f],
[UIColor colorWithRed:0.490f green:0.486f blue:0.518f alpha:1.000f],
[UIColor colorWithRed:0.325f green:0.318f blue:0.337f alpha:1.000f],
[UIColor colorWithRed:0.235f green:0.231f blue:0.247f alpha:1.000f],
[UIColor colorWithRed:0.141f green:0.137f blue:0.149f alpha:1.000f],
[UIColor colorWithRed:0.992f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.937f green:0.608f blue:0.051f alpha:1.000f],
[UIColor colorWithRed:0.992f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.992f green:0.929f blue:0.208f alpha:1.000f],
[UIColor colorWithRed:0.392f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.345f green:0.910f blue:0.420f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.953f blue:0.416f alpha:1.000f],
[UIColor colorWithRed:0.471f green:0.925f blue:0.424f alpha:1.000f],
[UIColor colorWithRed:0.329f green:1.000f blue:0.584f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.431f blue:0.349f alpha:1.000f],
[UIColor colorWithRed:0.380f green:0.925f blue:0.698f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.706f blue:0.349f alpha:1.000f],
[UIColor colorWithRed:0.000f green:1.000f blue:0.894f alpha:1.000f],
[UIColor colorWithRed:0.125f green:0.322f blue:0.451f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.808f blue:0.784f alpha:1.000f],
[UIColor colorWithRed:0.341f green:0.710f blue:0.694f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.271f alpha:1.000f],
[UIColor colorWithRed:0.235f green:0.847f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.176f green:0.463f blue:0.800f alpha:1.000f],
[UIColor colorWithRed:0.420f green:0.000f blue:0.843f alpha:1.000f],
[UIColor colorWithRed:0.098f green:0.000f blue:0.529f alpha:1.000f],
[UIColor colorWithRed:0.059f green:0.208f blue:0.557f alpha:1.000f],
[UIColor colorWithRed:0.059f green:0.208f blue:0.557f alpha:1.000f],
[UIColor colorWithRed:0.569f green:0.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.243f green:0.000f blue:0.702f alpha:1.000f],
[UIColor colorWithRed:0.827f green:0.569f blue:0.980f alpha:1.000f],
[UIColor colorWithRed:0.243f green:0.000f blue:0.702f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.494f green:0.102f blue:0.396f alpha:1.000f],
[UIColor colorWithRed:0.906f green:0.475f blue:0.722f alpha:1.000f],
[UIColor colorWithRed:0.494f green:0.102f blue:0.396f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.639f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.392f blue:0.204f alpha:1.000f],
[UIColor colorWithRed:0.867f green:0.173f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.937f green:0.447f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.898f green:0.349f blue:0.161f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.584f blue:0.400f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.341f blue:0.133f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.580f blue:0.114f alpha:1.000f],
[UIColor colorWithRed:0.776f green:0.412f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.788f blue:0.278f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.596f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.341f green:0.710f blue:0.694f alpha:1.000f] [UIColor colorWithRed:0.827f green:0.569f blue:0.980f alpha:1.000f],
[UIColor colorWithRed:0.235f green:0.231f blue:0.247f alpha:1.000f],
[UIColor colorWithRed:0.600f green:0.600f blue:0.639f alpha:1.000f],
[UIColor colorWithRed:0.235f green:0.231f blue:0.247f alpha:1.000f],
[UIColor colorWithRed:0.698f green:0.694f blue:0.737f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
