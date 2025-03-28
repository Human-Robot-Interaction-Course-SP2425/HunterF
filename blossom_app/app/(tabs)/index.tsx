import { Gesture, gesturesAtom } from "@/atoms/gesture.atoms";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { ThemedText } from "@/components/common/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFocusEffect } from "expo-router";
import { useAtom } from "jotai";
import { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import GestureList from "@/components/gestures/GestureList";
import GestureInput from "@/components/gestures/GestureInput";

export default function Index() {
  const [name, setName] = useState("");
  const [gestureData, setGestureData] = useAtom(gesturesAtom);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const inputBackground = useThemeColor({}, "inputBackground");
  const textColor = useThemeColor({}, "text");

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

  const resetButtonAction = async () => {
    try {
      await fetch("http://localhost:8000/reset");
    } catch (error) {
      alert("Failed to reset!");
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
        <GestureInput name={name} onKeyPress={onKeyPress} />
        {gestureData.isLoading ? <Loading /> : <GestureList name={name} />}
        <Button
          label="RESET"
          onPress={resetButtonAction}
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
