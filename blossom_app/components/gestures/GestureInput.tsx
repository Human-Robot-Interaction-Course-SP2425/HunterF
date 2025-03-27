import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useMemo, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  name: string;
  onKeyPress: (text: string) => void;
};

export default function GestureInput({ name, onKeyPress }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const textColor = useThemeColor({}, "text");
  const iconFocusColor = useThemeColor({}, "inputIconFocus");
  const inputBackgroundColor = useThemeColor({}, "inputBackground");
  const focusedBorderColor = useThemeColor({}, "inputFocusBorder");
  const hoverBorderColor = useThemeColor({}, "inputHoverBorder");
  const placeholderColor = useThemeColor({}, "inputPlaceholder");
  const inputIconColor = useThemeColor({}, "inputIcon");
  const inputFocusBackgroundColor = useThemeColor({}, "inputFocusBackground");

  const iconColor = useMemo(() => {
    if (isFocused) return iconFocusColor;
    return inputIconColor;
  }, [isFocused]);

  const backgroundColor = useMemo(() => {
    if (isFocused) return inputFocusBackgroundColor;
    return inputBackgroundColor;
  }, [isFocused]);

  const borderColor = useMemo(() => {
    if (isFocused) return focusedBorderColor;
    if (isHovered) return hoverBorderColor;
    return "transparent";
  }, [isFocused, isHovered]);

  return (
    <View style={styles.container}>
      <AntDesign
        name="search1"
        size={20}
        style={[styles.icon, { color: iconColor }]}
      />
      <Pressable
        style={styles.button}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <TextInput
          inputMode="search"
          style={[
            styles.input,
            {
              backgroundColor,
              color: textColor,
              borderColor,
              outline: "none",
            },
          ]}
          aria-label="Search for gestures"
          value={name}
          role="searchbox"
          onChangeText={onKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for gestures"
          placeholderTextColor={placeholderColor}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  input: {
    borderRadius: 10,
    padding: 10,
    paddingLeft: 40,
    width: "100%",
    borderWidth: 2,
  },
  button: {
    width: "100%",
  },
});
