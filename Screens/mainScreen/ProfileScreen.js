// import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// const ProfileScreen = () => {

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heder}>
        <Text>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heder: {
    color: "#212121",
  },
});
