/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    border: '#d8d8d8',
    hover: '#f0f2f5',
    tabIconSelected: tintColorLight,

    inputBackground: '#f0f2f5',
    inputPlaceholder: '#6f869f',
    inputFocusBorder: '#1083fe',
    inputFocusBackground: '#e2e7ec',
    inputHoverBorder: '#d4dbe2',
    inputIconFocus: '#1083fe',
    inputIcon: '#6f869f',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0E1113',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    hover: '#1a2024',
    border: "#212121",
    tabIconSelected: tintColorDark,

    inputBackground: '#1a2024',
    inputPlaceholder: '#999',
    inputHover: '#212121',
    inputFocusBorder: '#1083fe',
    inputFocusBackground: '#222b30',
    inputHoverBorder: '#283036',
    inputIconFocus: '#1083fe',
    inputIcon: '#999',
  },
};