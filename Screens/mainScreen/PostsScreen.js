import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

export default function PostsScreen({ route }) {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  // heder: {
  //   color: "#212121",
  // },

  list: {},

  postWrapper: {
    marginTop: 32,
  },

  imgWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: 340,
    height: 240,
    borderRadius: 8,
    objectFit: "cover",
  },

  postTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },

  location: {
    textAlign: "right",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
  },
});

// export default PostsScreen;
