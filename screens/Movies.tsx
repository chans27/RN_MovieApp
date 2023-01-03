import {NativeStackScreenProps} from "react-native-screens/native-stack";
import React from "react";
import {ActivityIndicator , Dimensions , FlatList} from 'react-native'
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/Hmedia";
import Slide from "../components/Slide";
import VMedia from "../components/Vmedia";
import {useQuery, useQueryClient} from "react-query";
import {MovieResponse, moviesApi} from "../api";
import Loader from "../components/Loader";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`as unknown as typeof FlatList;

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
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data:upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(
    ["movies", "upcoming"],
    moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data:trendingData,
    isRefetching: isRefetchingTrending
  } = useQuery<MovieResponse>(
    ["movies", "trending"],
    moviesApi.trending);

    const onRefresh = async () => {
      await queryClient.refetchQueries(["movies"])
    };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading
  const refreshing = isRefetchingTrending || isRefetchingUpcoming || isRefetchingNowPlaying
    return loading ? (
          <Loader />
        ) : (
        upcomingData ? (
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
              { nowPlayingData?.results.map((movie) => <Slide
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview} />
              )}
            </Swiper>
              <ListTitle>Trending Movies</ListTitle>
              <ListContainer>
                {trendingData ? <TrendingScroll
                  horizontal
                  data={trendingData.results}
                  keyExtractor={(item) => item.id + ""}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: 30 }}
                  ItemSeparatorComponent={VSeparator}
                  renderItem={({ item }) => (
                    <VMedia
                      posterPath={item.poster_path || ""}
                      originalTitle={item.original_title}
                      voteAverage={item.vote_average}
                    />
                  )}
                /> : null }
              </ListContainer>
              <ComingSoonTitle>Coming Soon</ComingSoonTitle >
          </>
          }
          data={upcomingData.results}
          keyExtractor={(item) => item.id + ""}
          ItemSeparatorComponent={HSeparator}
          renderItem={
            ({ item }) => (
              <HMedia
                posterPath={item.poster_path || ""}
                originalTitle={item.original_title}
                overview={item.overview}
                releaseDate={item.release_date}
              />
            )
          }
        />) : null
    );
};

export default Movies;