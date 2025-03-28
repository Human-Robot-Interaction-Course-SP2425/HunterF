import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function BlocklyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Editor",
        }}
      />
    </Stack>
  );
}
