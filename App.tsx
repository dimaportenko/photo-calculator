import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "./src/lib/tailwind";

export default function App() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
