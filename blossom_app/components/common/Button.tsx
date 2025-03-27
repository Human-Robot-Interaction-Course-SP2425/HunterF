import { useThemeColor } from "@/hooks/useThemeColor";
import { useRef } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  Animated,
  Platform,
} from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  pressedStyle?: ViewStyle;
  hoveredStyle?: ViewStyle;
};

export default function Button({
  label,
  onPress,
  containerStyle,
  buttonStyle,
  labelStyle,
  pressedStyle,
  hoveredStyle,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderColor = useThemeColor({}, "border");

  // const handlePressIn = () => {
  //   if (Platform.OS === "web") {
  //     Animated.timing(scaleAnim, {
  //       toValue: 0.98,
  //       useNativeDriver: true,
  //       duration: 20,
  //     }).start();
  //   }
  // };

  // const handlePressOut = () => {
  //   if (Platform.OS === "web") {
  //     Animated.timing(scaleAnim, {
  //       toValue: 1,
  //       duration: 20,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        styles.buttonContainer,
        containerStyle,
        { borderColor },
      ]}
    >
      <Pressable
        style={({ pressed, hovered }) => [
          styles.button,
          buttonStyle,
          hovered && hoveredStyle,
          pressed && pressedStyle,
        ]}
        onPress={onPress}
        // onPressIn={handlePressIn}
        // onPressOut={handlePressOut}
      >
        <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {},
});
