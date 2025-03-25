import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useWindowDimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const tabBarPosition = width > 600 ? "top" : "bottom";
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarPosition,
          headerShown: false,
          tabBarStyle: [styles.tabBar, { backgroundColor }],
          tabBarActiveTintColor: textColor,
          tabBarInactiveTintColor: iconColor,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Gestures",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="robot" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="blockly"
          options={{
            title: "Blockly",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cube" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            title: "Videos",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="youtube" color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabBar: {
    borderTopWidth: 1,
    height: 60,
  },
});
