import React from "react";
import {View, Text} from "react-native";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";

const Btn = styled.View`
  flex: 1; 
  justify-content:center; 
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  
`

const Movies: React.FC<NativeStackScreenProps<any, "Movies" >> = ({
    navigation: { navigate },
    }) => (
    <Btn onPress={() => navigate("Stack", {screen:"Three"})}>
      <Title>Movies!</Title>
    </Btn>
)

export default Movies;