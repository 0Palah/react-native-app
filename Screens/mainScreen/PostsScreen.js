import React from "react";
import {} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Button, Pressable } from "react-native";

const NestedScrren = createNativeStackNavigator();

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/mapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

export default function PostsScreen({ route }) {
  // console.log("route: ", route);
  return (
    <NestedScrren.Navigator>
      <NestedScrren.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScrren.Screen name="MapScreen" component={MapScreen} />
      <NestedScrren.Screen name="CommentsScreen" component={CommentsScreen} />
    </NestedScrren.Navigator>
  );
}
