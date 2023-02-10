// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// const PostsScreen = () => {

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }

    // return () => {
    //   second;
    // };
  }, [route.params]);

  console.log("PostsScreen --> posts: ", posts);
  console.log("PostsScreen --> route.params: ", route.params);
  return (
    <View style={styles.container}>
      <View style={styles.heder}>
        <Text>Публикации</Text>
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

// export default PostsScreen;
