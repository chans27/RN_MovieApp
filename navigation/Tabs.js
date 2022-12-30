import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tv from "../screens/Television";
import Search from "../screens/Search";
import Movies from "../screens/Movie";
import {Text, View} from "react-native";
import {StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: "coral",
    }}>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
);
export default Tabs;