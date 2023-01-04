import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const Nav = createStackNavigator();

const Root = () => (
  <Nav.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);

export default Root;
