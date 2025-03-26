import { Gesture, gesturesAtom } from "@/atoms/gesture.atoms";
import Button from "@/components/common/Button";
import Loading from "@/components/Loading";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useAtom } from "jotai";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import GestureList from "@/components/gestures/GestureList";

export default function Index() {
  const [name, setName] = useState("");
  const [gestureData, setGestureData] = useAtom(gesturesAtom);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;
  const borderColor = useThemeColor({}, "border");
  const inputBackground = useThemeColor({}, "inputBackground");
  const textColor = useThemeColor({}, "text");
  const colorScheme = useColorScheme();

  const getScaleAnim = (itemName: string) => {
    if (!scaleAnims[itemName]) {
      scaleAnims[itemName] = new Animated.Value(1);
    }
    return scaleAnims[itemName];
  };

  const handlePressIn = (itemName: string) => {
    if (Platform.OS === "web") {
      Animated.timing(getScaleAnim(itemName), {
        toValue: 0.98,
        useNativeDriver: true,
        duration: 20,
      }).start();
    }
  };

  const handlePressOut = (itemName: string) => {
    if (Platform.OS === "web") {
      Animated.timing(getScaleAnim(itemName), {
        toValue: 1,
        duration: 20,
        useNativeDriver: true,
      }).start();
    }
  };

  const fetchGestures = () => {
    setGestureData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    // fetch("http://localhost:8000/gestures")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setGestureData((prevState) => ({
    //       ...prevState,
    //       data,
    //     }));
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .finally(() => {
    //     setGestureData((prevState) => ({
    //       ...prevState,
    //       isLoading: false,
    //     }));
    //   });

    const testData = (() => {
      const data: Gesture[] = [];
      for (let i = 0; i < 60; i++) {
        data.push({
          name: `Test Gesture ${i + 1}`,
          duration: `${i + 1}`,
        });
      }
      return data;
    })();

    setGestureData((prevState) => ({
      ...prevState,
      data: testData,
      isLoading: false,
    }));
  };

  useFocusEffect(
    useCallback(() => {
      fetchGestures();
    }, [])
  );

  const onKeyPress = (text: string) => {
    setName(text);
  };

  const playGesture = async (gesture: Gesture) => {
    try {
      await fetch(`http://localhost:8000/s/${gesture.name}`);
      alert(`Playing gesture: ${gesture.name}`);
    } catch (error) {
      alert(`Failed to play gesture: ${gesture.name}`);
    }
  };

  const resetButtonAction = async () => {
    try {
      await fetch("http://localhost:8000/reset");
    } catch (error) {
      alert("Failed to reset!");
    }
  };

  const filteredGestures = gestureData.data.filter((gesture) =>
    gesture.name.toLowerCase().includes(name.toLowerCase())
  );

  const getHoverBackgroundColor = (pressed: boolean, hovered: boolean) => {
    if (!pressed && !hovered) return undefined;

    if (colorScheme === "dark") {
      return "#1a2024";
    } else {
      return "#d8d8d8";
    }
  };

  return (
    <View style={[styles.container, { width: isMobile ? "90%" : "40%" }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.header}>
          Gestures List
        </ThemedText>
        <View style={styles.inputContainer}>
          <AntDesign
            name="search1"
            size={20}
            style={[styles.searchIcon, { color: textColor }]}
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: inputBackground, color: textColor },
            ]}
            value={name}
            onChangeText={onKeyPress}
            placeholder="Search for gestures"
            placeholderTextColor="#999"
          />
        </View>
        {gestureData.isLoading ? <Loading /> : <GestureList name={name} />}
        <Button
          label="RESET"
          action={resetButtonAction}
          containerStyle={styles.resetButtonContainerStyle}
          labelStyle={styles.resetButtonLabelStyle}
          hoveredStyle={styles.resetButtonHoveredStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginHorizontal: "auto",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    marginTop: 20,
    width: "100%",
  },
  header: {
    marginBottom: 8,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    borderRadius: 10,
    padding: 10,
    paddingLeft: 40,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  gesturesList: {
    width: "100%",
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  gestureItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
  },
  gestureName: {
    fontSize: 16,
    fontWeight: "500",
  },
  gestureDuration: {
    fontSize: 16,
    color: "#666",
  },
  resetButtonContainerStyle: {
    backgroundColor: "#800000",
    marginBottom: 10,
  },
  resetButtonLabelStyle: {
    fontWeight: "800",
    color: "white",
    fontSize: 24,
  },
  resetButtonHoveredStyle: {
    backgroundColor: "#700000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
