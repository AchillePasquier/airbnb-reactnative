import {
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  Platform,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import axios from "axios";
import MapView from "react-native-maps";

import { Entypo } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

export default function RoomScreen({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        //console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<Entypo key={i} name="star" size={20} color="#FFB000" />);
      } else {
        tab.push(<Entypo key={i} name="star" size={20} color="#BBBBBB" />);
      }
    }
    return tab;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#EB5A62"
          style={{ paddingTop: 100 }}
        />
      ) : (
        <ScrollView>
          <SwiperFlatList
            style={styles.carousel}
            showPagination
            paginationStyle={{ position: "absolute", top: 205, opacity: 0.7 }}
            data={data.photos}
            renderItem={({ item }) => {
              //console.log(item);
              return (
                <Image
                  source={{ uri: item.url }}
                  style={styles.ImageCarousel}
                />
              );
            }}
          />
          <View style={styles.bottomPart}>
            <View style={styles.leftPart}>
              <Text numberOfLines={1}>{data.title}</Text>
              <View style={styles.stars}>
                {displayStars(data.ratingValue)}
                <Text style={styles.reviews}>{data.reviews} reviews</Text>
              </View>
              <View style={styles.viewPrice}>
                <Text style={styles.textPrice}>{data.price} €</Text>
              </View>
            </View>
            <View style={styles.rightPart}>
              <Image
                style={styles.imageUser}
                source={{ uri: data.user.account.photo.url }}
              />
            </View>
          </View>
          <Text
            numberOfLines={displayAllText === false ? 3 : null}
            style={styles.description}
          >
            {data.description}
          </Text>
          <TouchableOpacity onPress={() => setDisplayAllText(!displayAllText)}>
            <Text style={styles.moreOrLess}>
              {displayAllText === false ? "See more" : "See less"}
            </Text>
          </TouchableOpacity>
          <MapView
            style={{ height: 300 }}
            initialRegion={{
              latitude: data.location[1],
              longitude: data.location[0],
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: data.location[1],
                longitude: data.location[0],
              }}
            />
          </MapView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  carousel: {
    // borderColor: "red",
    // borderWidth: 2,
  },
  ImageCarousel: {
    height: 250,
    width: width,
    // borderColor: "red",
    // borderWidth: 2,
  },
  viewPrice: {
    height: 40,
    width: 80,
    backgroundColor: "black",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  textPrice: {
    color: "white",
    fontSize: 15,
  },
  bottomPart: {
    flexDirection: "row",
    padding: 10,
  },
  leftPart: {
    width: "80%",
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
  },
  reviews: {
    color: "#BBBBBB",
    marginLeft: 8,
    marginTop: 2,
  },
  rightPart: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 2,
  },
  imageUser: {
    height: 60,
    width: 60,
    //borderRadius: 50,
  },
  description: {
    padding: 10,
    lineHeight: 20,
    //textAlign: "justify",
  },
  moreOrLess: {
    paddingLeft: 10,
    fontWeight: "500",
  },
});
