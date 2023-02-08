import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreateScreen from "./Screens/mainScreen/CreateScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (focused, color, size) => (
            <SimpleLineIcons name="grid" size={24} color="#212121CC" />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (focused, color, size) => (
            <AntDesign name="plus" size={13} color="#212121CC" />
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (focused, color, size) => (
            <Feather name="user" size={24} color="#212121CC" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
