import React from "react";
import {View, Text, ScrollView, FlatList, RefreshControl} from "react-native";
import {useQuery, useQueryClient} from "react-query";
import {tvApi} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Tv = () => {
  const queryClient = useQueryClient();

  const { isLoading:todayLoading, data:todayData, isRefetching: todayRefetChing} = useQuery(
    ["tv", "today"],
    tvApi.airingToday);
  const { isLoading:topLoading, data:topData, isRefetching: topRefetChing } = useQuery(
    ["tv", "top"],
    tvApi.topRated);
  const { isLoading:trendingLoading, data:trendingData, isRefetching: trendingRefetChing } = useQuery(
    ["tv", "trending"],
    tvApi.trending);

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"])
  }

  const loading = todayLoading || topLoading || trendingLoading;

  const refreshing = todayRefetChing || topRefetChing || trendingRefetChing

  if(loading) {
    return <Loader />
  }
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingVertical: 30} }>
      <HList title="Trending TV" data={trendingData.results}/>
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results}/>
    </ScrollView>
  )
}

export default Tv;