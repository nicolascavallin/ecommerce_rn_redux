import { BottomSheetBackdropProps, useBottomSheet } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Backdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.4],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000000",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  const { close } = useBottomSheet();

  return (
    <Animated.View style={containerStyle}>
      <Pressable
        style={[StyleSheet.absoluteFillObject]}
        onPress={() => close()}
      />
    </Animated.View>
  );
};

export default Backdrop;
