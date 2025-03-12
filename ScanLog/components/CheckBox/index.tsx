import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { styles } from "./styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export const checkBoxList = () => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          isChecked={isSelected}
          onPress={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Do you like React Native?</Text>
      </View>
      <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
    </View>
  );
};
