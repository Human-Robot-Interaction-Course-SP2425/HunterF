import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Animated, useColorScheme } from "react-native";
import { Image } from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

type Props = {
  children: React.ReactNode;
};

export default function SplashScreenWrapper({ children }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        setIsVisible(false);
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.root}>
      {children}
      {isVisible && (
        <Animated.View
          style={[
            styles.splashContainer,
            {
              opacity: fadeAnim,
              backgroundColor:
                colorScheme === "dark"
                  ? DarkTheme.colors.background
                  : DefaultTheme.colors.background,
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/rose-logo.png")}
              style={[
                styles.logo,
                {
                  tintColor:
                    colorScheme === "dark"
                      ? DarkTheme.colors.text
                      : DefaultTheme.colors.text,
                },
              ]}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
