import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tv from "../screens/Television";
import Search from "../screens/Search";
import Movies from "../screens/Movies";
import {useColorScheme} from 'react-native';
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return(
    <Tab.Navigator sceneContainerStyle={{
      backgroundColor: isDark ? colors.dark_blue : colors.sky_blue
    }}
        screenOptions={{
          unmountOnBlur: true,
      tabBarActiveTintColor: isDark ? "coral" : colors.gray,
      tabBarStyle: {
        backgroundColor: isDark ? colors.dark_blue : colors.sky_blue
      },
      tabBarInactiveTintColor: isDark ? "white" : colors.black,
      headerStyle : {
        backgroundColor: isDark ? colors.dark_blue : colors.sky_blue,
      },
      headerTitleStyle : {
        color : isDark ? "white" : "black"
      },
      tabBarLabelStyle: {
        fontSize: 13,
        fontWeight: "500",
        marginTop : "-5%",
      },
    }}>
      <Tab.Screen
        name="Movies"
        component={Movies} //screen/Movies.tsx file
        options={{
          tabBarIcon : ({color, size}) => (
            <Ionicons name="film" color={color} size={size} />
         )}}
      />
      <Tab.Screen
          name="TV"
          component={Tv}
          options={{
            tabBarIcon : ({color, size}) => (
                <Ionicons name="tv" color={color} size={size} />
            )}}
      />
      <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon : ({focused, color, size}) => {
              console.log(focused, color, size)
              return <Ionicons name={focused ? "search" : "search-circle"} color={color} size={size} />
          }}}
      />
    </Tab.Navigator>
)};
export default Tabs;