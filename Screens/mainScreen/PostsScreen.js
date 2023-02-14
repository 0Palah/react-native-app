import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

import { Feather } from "@expo/vector-icons";

const NestedScreen = createNativeStackNavigator();

export default function PostsScreen({ route }) {
  return (
    <NestedScreen.Navigator screenOptions={styles.mainTabContainer}>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: "Публикации",
          headerStyle: {
            height: 83,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8",
          },

          headerTitleContainerStyle: {
            paddingBottom: 11,
            marginRight: 0,
          },

          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            letterSpacing: -0.408,
            color: "#212121",
            marginTop: "auto",
          },

          headerRightContainerStyle: {
            paddingRight: 16,
            marginTop: "auto",
            marginBottom: 11,
            // color: "#BDBDBD",
          },

          headerRight: (focused, color, size) => (
            // <Pressable
            //   onPress={() => {
            //     console.log(123);
            //     navigation.navigate("Login");
            //   }}
            // >
            //   <Feather name="log-out" size={24} color="black" />
            // </Pressable>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          ),
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Карта",
        }}
      />
    </NestedScreen.Navigator>
  );
}

const styles = StyleSheet.create({
  mainTabContainer: {
    headerTitleAlign: "center",

    tabBarStyle: {
      height: 83,
      paddingTop: 9,
      paddingBottom: 34,
      paddingHorizontal: 82,
    },
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

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
