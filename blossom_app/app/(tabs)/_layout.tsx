import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useWindowDimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import TabBar from "@/components/navigation/TabBar";

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const tabBarPosition = width > 600 ? "top" : "bottom";
  const isTopBarPosition = tabBarPosition === "top";
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.safeArea,
        { paddingBottom: isTopBarPosition ? 0 : 20, backgroundColor },
      ]}
    >
      <Tabs
        tabBar={(props) => (
          <TabBar {...props} isTopBarPosition={isTopBarPosition} />
        )}
        screenOptions={{
          tabBarPosition,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons name="robot" color={color} size={30} />
            ),
          }}
        />
        <Tabs.Screen
          name="blockly"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons name="cube" color={color} size={30} />
            ),
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons name="youtube" color={color} size={30} />
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
