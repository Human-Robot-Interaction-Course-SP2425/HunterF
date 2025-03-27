import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  isFocused: boolean;
  options: any;
  onPress: () => void;
};

export default function TabBarButton({ isFocused, options, onPress }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const iconColor = useThemeColor({}, isFocused ? "text" : "icon");

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        {options.tabBarIcon ? (
          options.tabBarIcon({ focused: isFocused, color: iconColor, size: 26 })
        ) : (
          <MaterialCommunityIcons name="apps" size={26} color={iconColor} />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
