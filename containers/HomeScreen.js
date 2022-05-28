import { useNavigation } from "@react-navigation/core";
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
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
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

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#EB5A62" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(elem) => elem._id}
          renderItem={({ item }) => {
            // on destructure chaque elem car chaque elem aura une clé "item" dans laquelle est contenue les informations qui nous intéressent.
            //console.log(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", { id: item._id });
                }}
              >
                <ImageBackground
                  style={styles.ImageBackground}
                  source={{ uri: item.photos[0].url }}
                >
                  <View style={styles.viewPrice}>
                    <Text style={styles.textPrice}>{item.price} €</Text>
                  </View>
                </ImageBackground>
                <View style={styles.bottomPart}>
                  <View style={styles.leftPart}>
                    <Text numberOfLines={1}>{item.title}</Text>
                    <View style={styles.stars}>
                      {displayStars(item.ratingValue)}
                      <Text style={styles.reviews}>{item.reviews} reviews</Text>
                    </View>
                  </View>
                  <View style={styles.rightPart}>
                    <Image
                      style={styles.imageUser}
                      source={{ uri: item.user.account.photo.url }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  ImageBackground: {
    height: 250,
    justifyContent: "flex-end",
  },
  viewPrice: {
    height: 40,
    width: 80,
    backgroundColor: "black",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
  },
  imageUser: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
