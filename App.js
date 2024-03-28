import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";

import { useFonts } from "expo-font";

import storeConfig from "./src/store/storeConfig";

import Navigator from "./src/Navigator";

export default function App() {
  const store = storeConfig;

  const [fontsLoaded] = useFonts({
    shelter: require("./assets/fonts/shelter.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "shelter",
  },
});
