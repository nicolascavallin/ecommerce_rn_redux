import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  CurvedTransition,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";

import { cartSelector } from "../../app/cart.reducer";
import {
  catalogSelector,
  loadCatalog,
  statusSelector,
} from "../../app/catalog.reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Product } from "../../app/types";
import ProductCard from "../../components/ProductCard";
import colors from "../../utils/colors";
import { formatPrice } from "../../utils/formatPrice";
import useStyle from "../../utils/useStyle";

const randomMessages = [
  "Hi buddy!",
  "Hey there!",
  "Welcome back!",
  "Let's order!",
  "Hello :)",
  "Ready to choose?",
];

interface ProductsScreenProps {
  navigation: NativeStackNavigationHelpers;
}

const ProductsScreen: FC<ProductsScreenProps> = ({ navigation }) => {
  //
  const style = useStyle();

  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelector);
  const catalog = useAppSelector(catalogSelector);
  const status = useAppSelector(statusSelector);

  const randomMessage = useMemo(
    () => randomMessages[Math.floor(Math.random() * randomMessages.length)],
    [],
  );

  const navigateToCheckout = () => navigation.navigate("Checkout");

  const keyExtractor = useCallback((item: Product) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <ProductCard
        key={item.id}
        product={item}
        dispatch={dispatch}
        quantity={cart.find(x => x.id === item.id)?.quantity ?? 0}
      />
    ),
    [cart],
  );

  const total = cart.reduce((sum, item) => {
    const _total = sum + item.price * item.quantity;
    return _total;
  }, 0);

  const ListHeaderComponent = useCallback(
    () => (
      <View style={style.containerProductsHeader}>
        <Text style={style.h1}>
          {status === "loading" ? "Loading products" : randomMessage}
        </Text>
        {status === "loading" ? (
          <ActivityIndicator color={colors.black} />
        ) : null}
      </View>
    ),
    [status],
  );

  useEffect(() => {
    dispatch(loadCatalog());
  }, []);

  return (
    <Animated.View style={style.rootContainer} layout={CurvedTransition}>
      <View style={style.flex}>
        <FlatList
          style={style.rootContainer}
          contentContainerStyle={style.scrollViewContent}
          data={catalog}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
        />
        <LinearGradient
          colors={["#FFFFFF00", "#FFFFFFFF"]}
          style={style.gradientWhiteBottom}
        />
      </View>
      {cart.length > 0 ? (
        <Animated.View
          key="checkout-button"
          style={style.bottomButtonContainer}
          entering={FadeInDown}
          exiting={FadeOutDown}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.bottomButton}
            onPress={navigateToCheckout}>
            <Text style={style.bottomButtonText}>Checkout</Text>
            <Text style={style.bottomButtonText}>{formatPrice(total)}</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

export default ProductsScreen;
