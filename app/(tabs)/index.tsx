import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: movieisLoading,
    error: movieError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0 " />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
        </Text>
        {movieisLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError ? (
          <Text>Error: {movieError?.message}</Text>
        ) : (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {movies && movies.length > 0 ? (
              movies.map((movie: { id: number | string; title: string }) => (
                <Text
                  key={movie.id}
                  style={{
                    color: "white",
                    fontSize: 14,
                    marginRight: 20,
                    marginBottom: 10,
                  }}
                >
                  {movie.title}
                </Text>
              ))
            ) : (
              <Text style={{ color: "white", marginTop: 10 }}>
                No movies found.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
