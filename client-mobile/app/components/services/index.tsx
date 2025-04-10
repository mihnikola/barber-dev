// app/menuservices.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReservationContext from "@/context/ReservationContext";
import axios from "axios";
import Loader from "@/components/Loader";

const MenuServices = () => {
  const navigation = useNavigation();
  const { updateReservation, reservation } = useContext(ReservationContext)!; // Access context  const route = useRoute();
  const [serviceData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const funcDateTimeReservation = (service: any) => {

    updateReservation({...reservation, service});
    navigation.navigate("components/reservation/datereservation");


  };

  useEffect(() => {

    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    setIsLoading(true);
    
    try {


      await axios
        .get(`${process.env.EXPO_PUBLIC_API_URL}/services/client`)
        .then((response) => {
          console.log("services",response.data);

          if(response.status === 200){
          setServicesData(response.data);
          setIsLoading(false);
        }
        })
        .catch((err) => {
          console.log("xxxxx",err)

          setIsLoading(false);
        });
    } catch (error) {
    console.log("objexxxxxxct",error)


      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Usluge & Cenovnik</Text>
      <View style={{ display: "flex" }}>
        {serviceData.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => funcDateTimeReservation(item)}
              style={styles.wrapper}
            >
              <View style={styles.content}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.data}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.duration}>
                    Trajanje: {item.duration} minuta
                  </Text>
                  <Text style={styles.price}>Cena: {item.price} RSD</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {isLoading && <Loader />}
    </ScrollView>
  );
};

export default MenuServices;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 5,
  },
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },

  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 50,
  },

  wrapper: {
    display: "flex",
    width: "100%",
    borderRadius: 20,
    padding: 10,
    overflowY: "scroll",
  },

  image: {
    width: 70,
    height: 70,
    overflow: "hidden",
    backgroundColor: "white",
    display: "flex",
  },
  content: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    gap: 20,
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  duration: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
});
