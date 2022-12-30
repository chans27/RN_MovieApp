import AppLoading from "expo-app-loading";
import React, {useState} from 'react';
import {Text, Image, useColorScheme} from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import {NavigationContainer, DarkTheme, DefaultTheme} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";

export default function App() {
  const [assets] = useAssets([require('./robot.jpeg')])
  const [fonts] = Font.useFonts(Ionicons.font);

  if (!assets || !fonts) {
    return (
        <AppLoading/>
    );
  }
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}

