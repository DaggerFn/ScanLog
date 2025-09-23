import React, { useRef, useEffect } from "react";
import {
  Animated,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
} from "react-native";

interface HighlightedInputProps extends TextInputProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  highlightColor?: string; // cor do flash
}

export function HighlightedInput({
  style,
  wrapperStyle,
  highlightColor = "#8fe7f2", // padrão: azul clarinho
  value,
  ...rest // onChangeText, placeholder, etc.
}: HighlightedInputProps) {
  const highlight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value === undefined) return;
    // dispara a animação sempre que "value" mudar
    Animated.sequence([
      Animated.timing(highlight, {
        toValue: 1,
        duration: 900,
        useNativeDriver: false,
      }),
      Animated.timing(highlight, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  // interpolação de cor de fundo
  const bgColor = highlight.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", highlightColor],
  });

  return (
    <Animated.View
      style={[styles.wrapper, wrapperStyle, { backgroundColor: bgColor }]}
    >
      <TextInput value={value} style={[styles.input, style]} {...rest} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 22,
  },
});
