import {NativeStackScreenProps} from "react-native-screens/native-stack";
import React, {useEffect, useState} from "react";
import {
  ActivityIndicator ,
  Dimensions ,
  Text ,
  StyleSheet ,
  useColorScheme ,
  ScrollView ,
  RefreshControl
} from 'react-native'
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 10px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  align-items: center;
`;
const Votes = styled.Text`
  color: white;
  font-size: 10px;
  margin-left: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Overview = styled.Text`
  color:white;
  opacity: 0.9;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 12px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`

const Movies: React.FC<NativeStackScreenProps<any, "Movies" >> = () => {
    const [refreshing, setRefreshing] = useState(false);
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
    }, []);
    const onRefresh = async () => {
      setRefreshing(true)
      await getData();
      setRefreshing(false);
    };

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
        ) : (
    <Container
      refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
    >
        <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={2.5}
            showsButtons={true}
            showsPagination={false}
            containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 30 }}
        >
            { nowPlaying.map((movie) => <Slide
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview} />
                )}
        </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <ListContainer>
      <TrendingScroll
        contentContainerStyle={{paddingLeft: 30}}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map(movie => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null }
            </Title>
            <Votes>
            {movie.vote_average > 0
              ? `⭐️${movie.vote_average}/10`
              : `not rated`
            }
              </Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </ListContainer>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle >
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko")}
            </Release>
            <Overview>{movie.overview !== "" && movie.overview.length > 13
              ? movie.overview.slice(0, 140) + '...'
              : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
    )
};


export default Movies;