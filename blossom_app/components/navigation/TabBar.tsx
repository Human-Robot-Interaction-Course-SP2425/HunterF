import { StyleSheet, View } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useThemeColor } from "@/hooks/useThemeColor";
import TabBarButton from "./TabBarButton";

type Props = BottomTabBarProps & {
  isTopBarPosition: boolean;
};

export default function TabBar({
  state,
  descriptors,
  navigation,
  isTopBarPosition,
}: Props) {
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderTopWidth: isTopBarPosition ? 0 : 1,
          borderBottomWidth: isTopBarPosition ? 1 : 0,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            isFocused={isFocused}
            options={options}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
