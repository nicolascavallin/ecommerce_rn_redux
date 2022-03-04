import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

import { store } from "./src/app/store";
import { Product } from "./src/app/types";
import { HeaderLeft, HeaderRight } from "./src/components/Header";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ProductsScreen from "./src/screens/ProductsScreen";

export type RootStackParamList = {
  Products: undefined;
  ProductDetail: { product: Product };
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={StyleSheet.absoluteFill}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTransparent: true,
                headerBlurEffect: "light",
                headerStyle: {
                  backgroundColor:
                    Platform.OS === "ios" ? "transparent" : "#FFFFFFE6",
                },
                title: "",
                headerRight: HeaderRight,
                headerLeft: HeaderLeft,
              }}>
              <Stack.Screen name="Products" component={ProductsScreen} />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
              />
              <Stack.Screen
                options={{ headerRight: () => null }}
                name="Checkout"
                component={CheckoutScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
