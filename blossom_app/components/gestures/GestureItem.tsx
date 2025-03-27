import { Gesture } from "@/atoms/gesture.atoms";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useState } from "react";

type Props = {
  data: Gesture;
  isLast: boolean;
};

export default function GestureItem({ data, isLast }: Props) {
  const [scaleValue] = useState(new Animated.Value(1));
  const borderColor = useThemeColor({}, "border");
  const hoverColor = useThemeColor({}, "hover");

  const onPress = async () => {
    try {
      await fetch(`http://localhost:8000/s/${data.name}`);
      alert(`Playing gesture: ${data.name}`);
    } catch (error) {
      alert(`Failed to play gesture: ${data.name}`);
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        style={({ pressed, hovered }) => [
          styles.container,
          {
            borderColor,
            borderBottomWidth: isLast ? 0 : 1,
            backgroundColor: pressed || hovered ? hoverColor : "transparent",
          },
        ]}
        onPress={onPress}
      >
        <View style={styles.content}>
          <ThemedText type="defaultSemiBold">{data.name}</ThemedText>
          <ThemedText type="default">{data.duration}s</ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  gestureName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gestureDuration: {
    fontSize: 16,
  },
});
