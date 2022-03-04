import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { FC, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  CurvedTransition,
  FadeInRight,
  FadeOutRight,
} from "react-native-reanimated";

import MINUS from "../../../assets/icons/minus.svg";
import PLUS from "../../../assets/icons/plus.svg";
import TRASH from "../../../assets/icons/trash.svg";
import { CartState, decrement, increment } from "../../app/cart.reducer";
import { ProductCart } from "../../app/types";
import colors from "../../utils/colors";
import { formatPrice } from "../../utils/formatPrice";

interface CartItemCardProps {
  item: ProductCart;
  index: number;
  dispatch: ThunkDispatch<
    {
      cart: CartState;
    },
    undefined,
    AnyAction
  >;
}

// Can't use useStyle because is in other context
const internalStyles = StyleSheet.create({
  paddingH16: {
    paddingHorizontal: 16,
  },
  containerCartItem: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  cartItemProduct: { flex: 1, marginRight: 8 },
  fontMedium: {
    fontFamily: "Raleway-Medium",
  },
  rowNoFlex: { flexDirection: "row" },
  buttonCartItem: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtons: { marginBottom: 12, flexDirection: "row" },
});

const CartItemCard: FC<CartItemCardProps> = ({ item, index, dispatch }) => {
  //
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => setIsEditing(x => !x);

  const handleIncrement = () => dispatch(increment(item));

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(decrement(item));
    } else {
      Alert.alert(
        "Remove product",
        "Do you want to remove the product of the cart?",
        [
          {
            onPress: () => {},
            text: "No, cancel",
            style: "cancel",
          },
          {
            onPress: () => dispatch(decrement(item)),
            text: "Yes, remove",
            style: "destructive",
          },
        ],
      );
    }
  };

  return (
    <Animated.View
      style={internalStyles.paddingH16}
      key={item.id}
      entering={FadeInRight.delay(50 * index)}
      exiting={FadeOutRight}
      layout={CurvedTransition}>
      <TouchableOpacity
        style={internalStyles.containerCartItem}
        onPress={handleToggle}>
        <View style={internalStyles.cartItemProduct}>
          <Text style={internalStyles.fontMedium} numberOfLines={1}>
            {item.quantity} × {item.title}
          </Text>
        </View>
        <View>
          <Text style={internalStyles.fontMedium}>
            {formatPrice(item.quantity * item.price)}
          </Text>
        </View>
      </TouchableOpacity>
      {isEditing ? (
        <View style={internalStyles.containerButtons}>
          <View style={internalStyles.rowNoFlex}>
            <TouchableOpacity
              onPress={handleDecrement}
              style={internalStyles.buttonCartItem}>
              {item.quantity > 1 ? (
                <MINUS width={12} fill={colors.black} />
              ) : (
                <TRASH height={12} fill={colors.destroy} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleIncrement}
              style={internalStyles.buttonCartItem}>
              <PLUS height={12} fill={colors.black} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </Animated.View>
  );
};

export default CartItemCard;
