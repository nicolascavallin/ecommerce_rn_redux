import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { RootStackParamList } from "../../../App";
import MINUS from "../../../assets/icons/minus.svg";
import PLUS from "../../../assets/icons/plus.svg";
import { CartState, decrement, increment } from "../../app/cart.reducer";
import { Product } from "../../app/types";
import colors from "../../utils/colors";
import { formatPrice } from "../../utils/formatPrice";
import useStyle from "../../utils/useStyle";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
interface ProductCardProps {
  product: Product;
  quantity: number;
  dispatch: ThunkDispatch<
    {
      cart: CartState;
    },
    undefined,
    AnyAction
  >;
}

const ProductCard: FC<ProductCardProps> = ({ product, dispatch, quantity }) => {
  //
  const { navigate } = useNavigation<NavigationProps>();

  const style = useStyle();

  const [loadingImage, setLoadingImage] = useState(true);

  const animatedImageValue = useSharedValue(0);

  const animatedImage = useAnimatedStyle(() => ({
    opacity: animatedImageValue.value,
    aspectRatio: 1,
  }));

  const handleOnLoadImage = () => {
    animatedImageValue.value = withTiming(1, { duration: 250 });
    setLoadingImage(false);
  };

  const navigateToProductDetail = () => navigate("ProductDetail", { product });

  const handleDecrement = () => dispatch(decrement(product));
  const handleIncrement = () => dispatch(increment(product));

  return (
    <Animated.View entering={FadeInRight}>
      <TouchableOpacity activeOpacity={0.7} onPress={navigateToProductDetail}>
        <View style={style.containerProductCard}>
          <View style={style.ratioSquare}>
            {loadingImage ? (
              <View style={[StyleSheet.absoluteFillObject, style.flexCenter]}>
                <ActivityIndicator color={colors.black} />
              </View>
            ) : null}
            <Animated.View style={animatedImage}>
              <FastImage
                source={{ uri: product.image }}
                style={style.ratioSquare}
                resizeMode="cover"
                onLoad={handleOnLoadImage}
              />
            </Animated.View>
          </View>
          <View style={style.containerProductCardInfo}>
            <Text style={style.fontMedium22} numberOfLines={1}>
              {product.title}
            </Text>
            <Text style={style.textPrice}>{formatPrice(product.price)}</Text>
            <View style={style.containerProductCardQuantity}>
              {quantity ? (
                <TouchableOpacity
                  onPress={handleDecrement}
                  style={style.flexCenterPadding8}>
                  <MINUS width={12} fill={colors.black} />
                </TouchableOpacity>
              ) : null}
              {quantity ? (
                <View style={[style.flexCenterPadding8, style.minWidth50]}>
                  <Text style={style.fontSemibold16}>{quantity}</Text>
                </View>
              ) : null}
              <TouchableOpacity
                onPress={handleIncrement}
                style={style.flexCenterPadding8}>
                {quantity ? (
                  <PLUS height={12} fill={colors.black} />
                ) : (
                  <Text style={style.fontSemibold}>Add to cart</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProductCard;
