import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  useColorScheme,
  ActivityIndicator,
} from "react-native";

export default function Loading() {
  return (
    <View style={styles.root}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 998,
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
