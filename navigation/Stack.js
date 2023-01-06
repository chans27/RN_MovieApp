import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../screens/Detail";
import {useColorScheme} from "react-native";
import colors from "../colors";

const NativeStack = createStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return(
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: isDark ? "black" : colors.bold_sky_blue
      },
      headerTitleStyle: {
        color: "white",
      },
    }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
      );
    };

export default Stack;
