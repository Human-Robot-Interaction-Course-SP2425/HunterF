import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Videos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Videos Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#666",
  },
});
