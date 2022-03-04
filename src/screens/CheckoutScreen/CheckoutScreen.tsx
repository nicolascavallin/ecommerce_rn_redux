import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";
import React, { FC, useCallback } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import { cartSelector, reset } from "../../app/cart.reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCart } from "../../app/types";
import CartItemCard from "../../components/CartItemCard";
import ItemSeparatorComponent from "../../components/ItemSeparatorComponent";
import { formatPrice } from "../../utils/formatPrice";
import useStyle from "../../utils/useStyle";

interface CheckoutScreenProps {
  navigation: NativeStackNavigationHelpers;
}

const CheckoutScreen: FC<CheckoutScreenProps> = ({ navigation }) => {
  //
  const style = useStyle();

  const cart = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();

  const handlePayAndReset = () => {
    Alert.alert("Finish", "After pay the cart will be reseted.", [
      {
        onPress: () => null,
        style: "cancel",
        text: "Cancel",
      },
      {
        onPress: () => {
          navigation.goBack();
          dispatch(reset());
        },
        style: "default",
        text: "Pay and reset",
      },
    ]);
  };

  const keyExtractor = useCallback((item: ProductCart) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }: { item: ProductCart; index: number }) => (
      <CartItemCard
        dispatch={dispatch}
        index={index}
        key={item.id}
        item={item}
      />
    ),
    [],
  );

  const items = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const ListHeaderComponent = useCallback(
    () => (
      <Text style={style.h1}>{cart.length ? "Checkout" : "Cart empty"}</Text>
    ),
    [Boolean(cart.length)],
  );
  const ListFooterComponent = useCallback(
    () => (
      <View>
        <Text style={style.h2}>{`${items} item${items > 1 ? "s" : ""}`}</Text>
        <Text style={style.h1}>
          Total{" "}
          {formatPrice(
            cart.reduce((sum, item) => {
              const total = sum + item.price * item.quantity;
              return total;
            }, 0),
          )}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.bottomButton}
          onPress={handlePayAndReset}>
          <Text style={style.bottomButtonText}>Pay and reset</Text>
        </TouchableOpacity>
      </View>
    ),
    [cart, items],
  );

  return (
    <FlatList
      style={style.rootContainer}
      contentContainerStyle={style.scrollViewContent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={cart.length ? ListFooterComponent : null}
      data={cart}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default CheckoutScreen;
