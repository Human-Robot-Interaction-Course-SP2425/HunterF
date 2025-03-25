import { Theme } from "@react-navigation/native";
import { fonts } from "@react-navigation/native/src/theming/fonts";

export const BlossomDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#800000",
    background: "#0E1113",
    card: "#121212",
    text: "#e5e5e7",
    border: "#212121",
    notification: "#ff443a"
  },
  fonts
}

export const BlossomLightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#800000',
    background: '#f2f2f2',
    card: '#ffffff',
    text: '#1c1c1e',
    border: '#d8d8d8',
    notification: '#ff3b30',
  },
  fonts,
};

