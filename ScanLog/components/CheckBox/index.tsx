import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { styles } from "./styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const CheckBoxList = () => {
  const [isSelected, setSelection] = useState(false);

  return (
    <BouncyCheckbox
      isChecked={isSelected}
      onPress={setSelection}
      style={styles.checkbox}
      text="Registrar"
    />
  );
};
