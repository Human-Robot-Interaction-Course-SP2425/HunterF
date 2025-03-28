import TabBar from "@/components/navigation/TabBar";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function BlocklyLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} isTopBarPosition={true} />}
      screenOptions={{
        tabBarPosition: "top",
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          paddingTop: 10,
          marginBottom: 10,
          height: 45,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pencil" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="code"
        options={{
          title: "Code",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="code" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
