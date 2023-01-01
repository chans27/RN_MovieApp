import {NativeStackScreenProps} from "react-native-screens/native-stack";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, Text, StyleSheet, useColorScheme} from 'react-native'
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";

const API_KEY = "6195530f152e74229396cafd68b78347";

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const Loader = styled.View`
  flex: 1;
    justify-content: center;
    align-items: center;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies" >> = () => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);
    const getTrending = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        ).json();
        setTrending(results);
        console.log(trending);
    };
    const getUpcoming = async() => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        ).json();
        setUpcoming(results);
    }
    const getNowPlaying: any = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
        ).json();
        // console.log(results);
        setNowPlaying(results);
        setLoading(false);
    };
    const getData = async () => {
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
        setLoading(false);
    }
    useEffect(() => {
        getData();
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
            { nowPlaying.map((movie) => <Slide
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview} />
                )}
        </Swiper>
    </Container>
    )
};


export default Movies;