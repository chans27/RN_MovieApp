import {NativeStackScreenProps} from "react-native-screens/native-stack";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, Text, StyleSheet, useColorScheme} from 'react-native'
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import {makeImgPath} from "../utils";

const API_KEY = "6195530f152e74229396cafd68b78347";

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
    justify-content: center;
    align-items: center;
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
    border-radius: 5px;
`;

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
    margin-left: 15px;
`;
const Overview = styled.Text`
    margin-top: 10px;
    color: rgba(255,255,255,0.6);
`;

const Votes = styled(Overview)`
    margin-top: 5px;
    font-size: 12px;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies" >> = () => {
    const isDark = useColorScheme() === "dark";
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const getNowPlaying: any = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
        ).json();
        console.log(results);
        setNowPlaying(results);
        setLoading(false);
    };
    useEffect(() => {
        getNowPlaying();
    }, [])

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
        ) : (
    <Container>
        <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={2.5}
            showsPagination={false}
            containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4 }}
            showsButtons={true}
        >
            { nowPlaying.map((movie) => (
                <View key={movie.id}>
                    <BgImg
                        style={StyleSheet.absoluteFill}
                        source={{ uri:makeImgPath(movie.backdrop_path) }}
                    />
                    <BlurView
                        tint={ isDark ? "dark" : "light"}
                        intensity={20}
                        style={StyleSheet.absoluteFill}
                    >
                        <Wrapper>
                            <Poster source={{uri: makeImgPath(movie.poster_path)}} />
                            <Column>
                                <Title>{movie.original_title}</Title>
                                { 1 > 0 ? (
                                    <Votes>⭐️{movie.vote_average} / 10</Votes>
                                ) : null}
                                <Overview>{movie.overview.slice(0,90)}...</Overview>
                            </Column>
                        </Wrapper>
                    </BlurView>
                </View>
            ))}
        </Swiper>
    </Container>
    )
};


export default Movies;