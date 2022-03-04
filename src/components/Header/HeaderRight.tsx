import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React, { FC, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import CART from "../../../assets/icons/cart.svg";
import { cartSelector } from "../../app/cart.reducer";
import { useAppSelector } from "../../app/hooks";
import CartBottomSheet from "../../screens/CartBottomSheet";
import colors from "../../utils/colors";
import useStyle from "../../utils/useStyle";

const HeaderRight: FC<HeaderButtonProps> = ({}) => {
  //
  const style = useStyle();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const cart = useAppSelector(cartSelector);

  const items = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <>
      <Animated.View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.padding8}
          onPress={() => bottomSheetModalRef.current?.present()}>
          <CART fill={colors.black} />
          {items ? (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={style.containerCartQuantity}>
              <Text style={style.textCartQuantity}>{items}</Text>
            </Animated.View>
          ) : null}
        </TouchableOpacity>
      </Animated.View>
      <CartBottomSheet ref={bottomSheetModalRef} />
    </>
  );
};

export default HeaderRight;
