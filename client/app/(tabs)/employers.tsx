import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import placeholderImg from "../../assets/images/placeholderImg.png";
import Loader from "@/components/Loader";
import ReservationContext from "@/context/ReservationContext";
import { Buffer } from 'buffer';
import { removeStorage } from "@/helpers";

const Employers = () => {
  const navigation = useNavigation();
  const [emplData, setEmplData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const { reservation, updateReservation } = useContext(ReservationContext)!; // Access context  const route = useRoute();
  const [uri, setUri] = useState(null);


  useEffect(() => {
    // removeStorage();
    fetchAllEmployees();
  }, []);



  const fetchAllEmployees = async () => {
    // removeStorage()
    setIsLoading(true);

          const api = `${process.env.EXPO_PUBLIC_API_URL}/users`;
          // const api = `http:///users`;
          console.log("object",api)
    try {
   await axios
        .get(`${api}`)
        .then((response) => {
          console.log("object",response.data)
          setEmplData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
        // const base64Image = Buffer.from(ssss.data, 'binary').toString('base64');

    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
console.log("emppp",emplData);
  const redirectHandler = (employer) => {
      updateReservation({ ...reservation,  employer });

    navigation.navigate("components/services/index");

  }




  
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Odaberite frizera</Text>
      {!isLoading && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {emplData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => redirectHandler(item)}
              style={styles.wrapper}
            >
              <View style={styles.content}>
                {item.image && (
                  <Image source={{uri: item.image}} style={styles.image} />
                )}
                {!item.image && (
                  <Image source={placeholderImg} style={styles.image} />
                )}
                <View style={styles.data}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={{ display: "flex", justifyContent: "center" }}>
                  <IconSymbol size={28} name="arrow.right" color="#000" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {isLoading && (
       <Loader />
      )}
    </ScrollView>
  );
};

export default Employers;

const styles = StyleSheet.create({

  wrapper: {
    display: "flex",
    width: "100%",
    borderRadius: 20,
    padding: 15,
    overflowY: "scroll",
  },
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },
  data: {
    display: "flex",
    justifyContent: "center",
    width: "55%",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
  },
  name: {
    fontSize: 18,
  },
  position: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "left",
  },
  content: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 20,
    padding: 10,
    gap: 20,
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    margin: 5,
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 60,
  },
  container: {
    flex: 1,
  },
});
