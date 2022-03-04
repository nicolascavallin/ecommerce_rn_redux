import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { FC, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { RootStackParamList } from "../../../App";
import MINUS from "../../../assets/icons/minus.svg";
import PLUS from "../../../assets/icons/plus.svg";
import { cartSelector, decrement, increment } from "../../app/cart.reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import colors from "../../utils/colors";
import { formatPrice } from "../../utils/formatPrice";
import useStyle from "../../utils/useStyle";

dayjs.extend(relativeTime);

type Params = RouteProp<RootStackParamList, "ProductDetail">;

interface ProductDetailScreenProps {
  navigation: NativeStackNavigationHelpers;
}

const ProductDetailScreen: FC<ProductDetailScreenProps> = ({ navigation }) => {
  //
  const {
    params: { product },
  } = useRoute<Params>();

  const style = useStyle();

  const [aspectRatio, setAspectRatio] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const cart = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();

  const animatedImageValue = useSharedValue(0);

  const animatedContainer = useAnimatedStyle(() => ({
    opacity: animatedImageValue.value,
  }));

  useEffect(() => {
    const productInCart = cart.find(x => x.id === product.id);

    if (productInCart) {
      setQuantity(productInCart.quantity);
    } else {
      setQuantity(0);
    }

    return () => {};
  }, [cart]);

  useEffect(() => {
    Image.getSize(product.image, (width: number, height: number) => {
      setAspectRatio(width / height);
      animatedImageValue.value = withTiming(1, { duration: 150 });
    });
  }, []);

  return (
    <ScrollView
      style={style.rootContainer}
      contentContainerStyle={style.scrollViewContent}>
      <Animated.View style={animatedContainer}>
        <Text style={style.h1}>{product.title}</Text>
        <View style={style.containerMainData}>
          <View style={style.containerProductDetailImage}>
            <FastImage
              source={{ uri: product.image }}
              style={{ aspectRatio }}
              resizeMode="cover"
            />
          </View>
          <View style={style.containerData}>
            <Text style={style.textPrice}>{formatPrice(product.price)}</Text>
            <View style={style.separator} />
            <Text style={style.textLabel}>Brand</Text>
            <Text style={style.textData}>{product.brand}</Text>
            <Text style={style.textLabel}>Released</Text>
            <Text style={style.textData}>
              {product.released ? dayjs(product.released).fromNow() : "No data"}
            </Text>
          </View>
        </View>
        <View style={style.containerData2}>
          <View style={style.flex}>
            <Text style={style.textData2}>Quantity</Text>
          </View>
          <View style={style.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={quantity === 0}
              onPress={() => dispatch(decrement(product))}
              style={[style.quantityButton, { opacity: quantity ? 1 : 0.5 }]}>
              <MINUS fill={colors.black} />
            </TouchableOpacity>
            <View style={style.containerQuantity}>
              <Text style={style.textData2}>{quantity}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => dispatch(increment(product))}
              style={style.quantityButton}>
              <PLUS fill={colors.black} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.containerData2}>
          <View style={style.flex}>
            <Text style={style.textData2}>Subtotal</Text>
          </View>
          <View style={style.containerSubtotal}>
            <Text style={style.textData2}>
              {formatPrice(quantity * product.price)}
            </Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
