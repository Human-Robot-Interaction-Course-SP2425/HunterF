import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

type Props = {
  rawCode: string;
  children?: React.ReactNode;
};

export default function BlocklyOutput({ rawCode, children }: Props) {
  return (
    <View
      style={Platform.OS === "web" ? styles.containerWeb : styles.container}
    >
      <ScrollView style={styles.codeContainer}>
        <Text style={styles.code}>{rawCode || "No code generated yet"}</Text>
      </ScrollView>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  containerWeb: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    flexBasis: 400,
    margin: 20,
  },
  codeContainer: {
    backgroundColor: "rgb(247,240,228)",
    padding: 10,
    height: 400,
    marginBottom: 20,
  },
  code: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
    color: "#333",
  },
});
