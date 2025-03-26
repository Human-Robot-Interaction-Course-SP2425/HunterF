import { Gesture } from "@/atoms/gesture.atoms";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";

type Props = {
  data: Gesture;
  index: number;
};

export default function GestureItem({ data, index }: Props) {
  const theme = useTheme();
  const [scaleValue] = useState(new Animated.Value(1));
  const colorScheme = useColorScheme();
  const borderColor = useThemeColor({}, "border");

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
      <TouchableHighlight
        style={styles.container}
        underlayColor={theme.dark ? "#1a2024" : "#d8d8d8"}
        onPress={onPress}
      >
        <View style={styles.content}>
          <ThemedText type="defaultSemiBold">{data.name}</ThemedText>
          <ThemedText type="default">{data.duration}s</ThemedText>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
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
