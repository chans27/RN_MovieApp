import {NativeStackScreenProps} from "react-native-screens/native-stack";
import React, {useEffect, useState} from "react";
import {ActivityIndicator , Dimensions , FlatList , Text , View} from 'react-native'
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/Hmedia";
import Slide from "../components/Slide";
import VMedia from "../components/Vmedia";
import {useQuery} from "react-query";
import {moviesApi} from "../api";

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

const VSeparator = styled.View`
  width:20px
`
const HSeparator = styled.View`
  height: 20px;
`


const Movies: React.FC<NativeStackScreenProps<any, "Movies" >> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading: nowPlayingLoading, data:nowPlayingData} = useQuery(
    "nowPlaying",
    moviesApi.nowPlaying);
  const {isLoading: upcomingLoading, data:upcomingData} = useQuery(
    "upcoming",
    moviesApi.upcoming);
  const {isLoading: trendingLoading, data:trendingData} = useQuery(
    "trending",
    moviesApi.trending);

    const onRefresh = async () => {

    };
    const renderVMedia = ({ item }) => (
      <VMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
      />
    )

    const renderHMedia = ({ item }) => (
      <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        overview={item.overview}
        releaseDate={item.release_date}
      />
    );
  const movieKeyExtractor = (item) => item.id;
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading
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
              { nowPlayingData.results.map((movie) => <Slide
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
                  data={trendingData.results}
                  horizontal
                  keyExtractor={movieKeyExtractor}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: 30 }}
                  ItemSeparatorComponent={VSeparator}
                  renderItem={renderVMedia}
                  />
              </ListContainer>
              <ComingSoonTitle>Coming Soon</ComingSoonTitle >
          </>}
          data={upcomingData.results}
          keyExtractor={movieKeyExtractor }
          ItemSeparatorComponent={HSeparator}
          renderItem={renderHMedia}
        /> // end of flatList
    );
};

export default Movies;