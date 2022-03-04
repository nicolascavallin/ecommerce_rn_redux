import React, { memo } from "react";
import { View } from "react-native";

import colors from "../../utils/colors";

const ItemSeparatorComponent = () => (
  <View
    style={{
      flex: 1,
      height: 1,
      marginHorizontal: 16,
      backgroundColor: colors.black + "1D",
    }}
  />
);

export default memo(ItemSeparatorComponent);
