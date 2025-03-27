import { SplashScreen, Stack } from "expo-router";
import SplashScreenWrapper from "@/components/navigation/SplashScreen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { BlossomDarkTheme, BlossomLightTheme } from "@/constants/Theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? BlossomDarkTheme : BlossomLightTheme}
    >
      <SplashScreenWrapper>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SplashScreenWrapper>
    </ThemeProvider>
  );
}
