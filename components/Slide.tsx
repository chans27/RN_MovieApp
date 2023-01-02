import React from 'react';
import styled from "styled-components/native";
import {StyleSheet, useColorScheme, View} from "react-native";
import {makeImgPath} from "../utils";
import {BlurView} from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
    font-weight: 600;
    color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 40%;
    margin-left: 30px;
`;
const Overview = styled.Text`
    margin-top: 10px;
`;

const Votes = styled(Overview)`
    margin-top: 5px;
    font-size: 12px;
`;

interface SlideProps {
  backdropPath: string,
  posterPath : string
  originalTitle: string,
  voteAverage: number,
  overview: string,
}

const Slide:React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview,
    }) => {
  const isDark = useColorScheme() === "dark";
  return (
      <View style={{ flex: 1 }} >
        <BgImg
            style={StyleSheet.absoluteFill}
            source={{ uri:makeImgPath(backdropPath) }}
        />
    <BlurView
        tint={ isDark ? "dark" : "light"}
        intensity={20}
        style={StyleSheet.absoluteFill}
    >
      <Wrapper>
        <Poster path={posterPath} />
        <Column>
          <Title>{originalTitle}</Title>
          { 1 > 0 ? (
              <Votes>⭐️{voteAverage} / 10</Votes>
          ) : null}
          <Overview>{overview.slice(0,90)}...</Overview>
        </Column>
      </Wrapper>
    </BlurView>
  </View>
  )
}

export default Slide;