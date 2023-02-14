import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { Ionicons } from "@expo/vector-icons";

export default function MapScreen({ route, navigation }) {
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.45,
          longitude: 30.523333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          //   key={index}
          coordinate={{ latitude: 50.45, longitude: 30.523333 }}
          //   title={marker.title}
          //   description={marker.description}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  map: {
    width: "100%",
    height: "100%",
  },
});
