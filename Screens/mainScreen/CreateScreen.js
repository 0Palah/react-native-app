// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

// const CreateScreen = () => {

export default function CreateScreen() {
  // const COURSES = [
  //   {
  //     id: "45k6-j54k-4jth",
  //     title: "HTML",
  //   },
  //   {
  //     id: "4116-jfk5-43rh",
  //     title: "JavaScript",
  //   },
  //   {
  //     id: "4d16-5tt5-4j55",
  //     title: "React",
  //   },
  //   {
  //     id: "LG16-ant5-0J25",
  //     title: "React Native",
  //   },
  // ];
  // const [courses, setCourses] = useState(COURSES);

  return (
    <View style={styles.container}>
      <View style={styles.heder}>
        <Text>Создать публикацию</Text>
      </View>
    </View>

    // ==================== Test ====================

    // <SafeAreaView style={styles.containerTest}>
    //   <FlatList
    //     data={courses}
    //     renderItem={({ item }) => <Text>{item.title}</Text>}
    //     keyExtractor={(item) => item.id}
    //   />
    // </SafeAreaView>
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

  // containerTest: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#ecf0f1",
  // },
});

// export default CreateScreen;
