import {NativeStackScreenProps} from "react-native-screens/native-stack";
import React, {useEffect, useState} from "react";
import {ActivityIndicator , Dimensions , FlatList , Text , View} from 'react-native'
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/Hmedia";
import Slide from "../components/Slide";
import VMedia from "../components/Vmedia";

const API_KEY = "6195530f152e74229396cafd68b78347";


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

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
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
        setNowPlaying(results);
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
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListHeaderComponent={<>
            <Swiper
              horizontal
              loop
              autoplay
              autoplayTimeout={3}
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
                  data={trending}
                  horizontal
                  keyExtractor={(item) => item.id+""}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: 30 }}
                  ItemSeparatorComponent={() => (<View style={{ width: 20}}></View>)}
                  renderItem={({item}) => (
                    <VMedia
                      posterPath={item.poster_path}
                      originalTitle={item.original_title}
                      voteAverage={item.vote_average}
                    />)
                  }/>
              </ListContainer>
              <ComingSoonTitle>Coming Soon</ComingSoonTitle >
          </>}
          data={upcoming}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
          renderItem={({item}) => (
            <HMedia
              posterPath={item.poster_path}
              originalTitle={item.original_title}
              overview={item.overview}
              releaseDate={item.release_date}
            />
          )}
        /> // end of flatList
    );
};

export default Movies;