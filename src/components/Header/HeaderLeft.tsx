import { useNavigation } from "@react-navigation/native";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

import BACK from "../../../assets/icons/back.svg";
import colors from "../../utils/colors";

const HeaderLeft: FC<HeaderBackButtonProps> = ({ canGoBack }) => {
  //
  const { goBack } = useNavigation();

  if (!canGoBack) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ padding: 8 }}
      onPress={goBack}>
      <BACK fill={colors.black} />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
