import { FlatList, StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { Gesture, gesturesAtom } from "@/atoms/gesture.atoms";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import GestureItem from "./GestureItem";

type Props = {
  name: string;
};

export default function GestureList({ name }: Props) {
  const [gestureData, setGestureData] = useAtom(gesturesAtom);
  const borderColor = useThemeColor({}, "border");

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

  const filteredGestures = gestureData.data.filter((gesture) =>
    gesture.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <FlatList
      data={filteredGestures}
      keyExtractor={(item) => item.name}
      style={[styles.container, { borderColor }]}
      renderItem={({ item, index }) => (
        <GestureItem data={item} index={index} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});
