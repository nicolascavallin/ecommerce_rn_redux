import { useHeaderHeight } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "./colors";

const useStyle = () => {
  //
  const headerHeight = useHeaderHeight();
  const safeArea = useSafeAreaInsets();

  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    rootContainer: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    scrollViewContent: {
      paddingTop: headerHeight,
      paddingBottom: safeArea.bottom + 16,
    },
    bottomButtonContainer: {
      paddingTop: 16,
      paddingBottom: safeArea.bottom + 16,
    },
    bottomButton: {
      marginHorizontal: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: colors.yellow,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bottomButtonText: {
      color: colors.violet,
      fontFamily: "Raleway-ExtraBold",
      fontSize: 20,
      textAlign: "center",
    },
    gradientWhiteBottom: {
      height: 12,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
    containerProductsHeader: { flexDirection: "row", alignItems: "center" },
    // General
    h1: {
      fontFamily: "Raleway-Bold",
      fontSize: 30,
      padding: 16,
      color: colors.black,
    },
    h2: {
      fontFamily: "Raleway-Bold",
      fontSize: 24,
      paddingHorizontal: 16,
      paddingTop: 16,
      color: colors.black,
    },
    textPrice: {
      fontFamily: "Raleway-Bold",
      fontSize: 22,
      textAlign: "right",
      color: colors.black,
    },
    // Product Details
    textLabel: {
      fontFamily: "Raleway-Medium",
      fontSize: 14,
      color: colors.black,
      textAlign: "right",
      marginTop: 8,
    },
    textData: {
      fontFamily: "Raleway-SemiBold",
      fontSize: 16,
      color: colors.black,
      textAlign: "right",
    },
    quantityButton: {
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: "#f9f6f4",
      borderWidth: 1,
      borderColor: "#e9e7e2",
      justifyContent: "center",
      alignItems: "center",
    },
    textData2: {
      fontFamily: "Raleway-Medium",
      fontSize: 18,
    },
    containerData: { flex: 1, marginLeft: 8 },
    containerData2: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      alignItems: "center",
      marginTop: 32,
    },
    row: { flexDirection: "row", flex: 1 },
    rowNoFlex: { flexDirection: "row" },
    separator: { height: 8 },
    containerMainData: { flexDirection: "row", paddingHorizontal: 16 },
    containerQuantity: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    containerSubtotal: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
    },
    // Cart
    emptyCartIllustration: {
      width: 250,
      height: 250,
      marginTop: 16,
      alignSelf: "center",
    },
    buttonCartItem: {
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    containerCartItem: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      paddingVertical: 12,
    },
    containerButtons: { marginBottom: 12, flexDirection: "row" },
    cartItemProduct: { flex: 1, marginRight: 8 },
    // Header
    textCartQuantity: {
      fontFamily: "Raleway-Bold",
      fontSize: 12,
      color: colors.violet,
    },
    containerCartQuantity: {
      position: "absolute",
      paddingVertical: 2,
      paddingHorizontal: 4,
      backgroundColor: colors.yellow,
      borderRadius: 1000,
      right: -2,
      top: -2,
    },
    padding8: { padding: 8 },
    fontMedium: {
      fontFamily: "Raleway-Medium",
      color: colors.black,
    },
    fontMedium22: {
      fontFamily: "Raleway-Medium",
      color: colors.black,
      fontSize: 22,
    },
    fontSemibold: {
      fontFamily: "Raleway-SemiBold",
      color: colors.black,
    },
    fontSemibold16: {
      color: colors.black,
      fontFamily: "Raleway-SemiBold",
      fontSize: 16,
    },
    paddingH16: {
      paddingHorizontal: 16,
    },
    containerProductCard: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: "#f9f6f4",
      borderWidth: 1,
      borderColor: "#e9e7e2",
      overflow: "hidden",
      borderRadius: 8,
      flexDirection: "row",
    },
    containerProductCardInfo: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    containerProductCardQuantity: {
      flexDirection: "row",
      marginTop: 8,
      justifyContent: "flex-end",
      height: 32,
    },
    ratioSquare: { aspectRatio: 1 },
    flexCenter: {
      justifyContent: "center",
      alignItems: "center",
    },
    flexCenterPadding8: {
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    minWidth50: { minWidth: 50 },
    containerProductDetailImage: {
      flex: 1,
      marginRight: 8,
      borderRadius: 8,
      overflow: "hidden",
    },
  });

  return styles;
};

export default useStyle;
