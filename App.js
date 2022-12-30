import AppLoading from "expo-app-loading";
import React, {useState} from 'react';
import {Text, Image} from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

export default function App() {
  const [assets] = useAssets([require('./robot.jpeg')])
  const [fonts] = Font.useFonts(Ionicons.font);
  if (!assets || !fonts) {
    return (
      <AppLoading />
    );
  }
  return <NavigationContainer>
    <Tabs />
  </NavigationContainer>
}

