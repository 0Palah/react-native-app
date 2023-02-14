import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

export default function CommentsScreen({ route, navigation }) {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          // styles for router MainTab.Navigator !!!
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 82,
        },
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
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
