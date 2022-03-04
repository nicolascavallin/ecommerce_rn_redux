import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { forwardRef, Ref, useCallback } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList } from "../../../App";
import EMPTY from "../../../assets/illustrations/empty_cart.svg";
import { cartSelector } from "../../app/cart.reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCart } from "../../app/types";
import CartItemCard from "../../components/CartItemCard";
import ItemSeparatorComponent from "../../components/ItemSeparatorComponent";
import Backdrop from "../../utils/Backdrop";
import { formatPrice } from "../../utils/formatPrice";
import useStyle from "../../utils/useStyle";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const CartBottomSheet = forwardRef((_, ref: Ref<BottomSheetModal>) => {
  //
  const { navigate, canGoBack, goBack } = useNavigation<NavigationProps>();

  const style = useStyle();

  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelector);

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

  const total = cart.reduce((sum, item) => {
    const _total = sum + item.price * item.quantity;
    return _total;
  }, 0);

  const ListHeaderComponent = useCallback(
    () => (
      <Text style={style.h1}>
        Your cart
        {items ? ` - ${items} item${items > 1 ? "s" : ""}` : " is empty"}
      </Text>
    ),
    [items],
  );

  const ListFooterComponent = useCallback(
    () => (
      <View style={style.emptyCartIllustration}>
        <EMPTY width="100%" height="100%" />
      </View>
    ),
    [],
  );

  const routeToCheckout = () => {
    // @ts-ignore because the call is valid
    ref?.current.dismiss();
    if (canGoBack()) {
      goBack();
    }
    navigate("Checkout");
  };

  const androidBack = useCallback(() => {
    // @ts-ignore
    ref.current.dismiss();

    return true;
  }, []);

  const androidGoBack = useCallback((x: number) => {
    if (x > -1) {
      BackHandler.addEventListener("hardwareBackPress", androidBack);
    } else {
      BackHandler.removeEventListener("hardwareBackPress", androidBack);
    }
  }, []);

  return (
    <BottomSheetModal
      onChange={androidGoBack}
      backdropComponent={Backdrop}
      ref={ref}
      snapPoints={["80%"]}>
      <View style={style.rootContainer}>
        <BottomSheetFlatList
          style={style.rootContainer}
          data={cart}
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={cart.length ? null : ListFooterComponent}
        />
      </View>
      {cart.length ? (
        <View style={style.bottomButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.bottomButton}
            onPress={routeToCheckout}>
            <Text style={style.bottomButtonText}>Checkout</Text>
            <Text style={style.bottomButtonText}>{formatPrice(total)}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </BottomSheetModal>
  );
});

export default CartBottomSheet;
