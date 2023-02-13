import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

export default function MapScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 16,
  },
});
