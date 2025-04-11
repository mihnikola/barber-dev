import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ReservationContext from "@/context/ReservationContext";
import Button from "@/shared-components/Button";
import { useNavigation } from "@react-navigation/native";
import CustomCheckbox from "@/shared-components/CustomCheckbox";
import * as Notifications from 'expo-notifications';
import { addMinutesToTime, convertDate } from "@/helpers";

const makereservation = () => {
  const { reservation } = useContext(ReservationContext);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const navigation = useNavigation();
  const { employer, service, timeData, dateReservation } = reservation;
  //   const [loading,setLoading] = useState(false);


  // const getFcmToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log("FCM Token:", token);
  //   // Send this token to your backend server
  // };
  // useEffect(() => {
  //   getFcmToken();

  //   const getPushNotificationToken = async () => {
  //     try {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       if (status === 'granted') {
  //         const token = await Notifications.getExpoPushTokenAsync();
  //         setExpoPushToken(token.data);
  //         console.log('Expo Push Token:', token.data);
  //       } else {
  //         console.log('Notification permission not granted');
  //       }
  //     } catch (error) {
  //       console.error('Error getting Expo push token:', error);
  //     }
  //   };
  //   getPushNotificationToken();

  // }, []);



  
  const submitReservationHandler =  async () => {
    // if (!expoPushToken) {
    //   console.log("No push token available");
    //   return;
    // }
    navigation.navigate("(tabs)", { screen: "explore" });
    
    
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.coverLogo}
      />
      <View style={styles.coverContent}>
        <Text style={styles.timeData}>
          {timeData.value} -{" "}
          {addMinutesToTime(timeData.value, service.duration)}
        </Text>
        <Text style={styles.dateData}>
          {convertDate(dateReservation)}
        </Text>
      </View>
      <View style={styles.whiteLine} />

      <View style={{ display: "flex", flexDirection: "column" }}>
        <View style={{ display: "flex" }}>
          <Text style={styles.message}>Termin je uspešno rezervisan!</Text>
        </View>
          <View style={styles.reservation}>
            <Button
              text="U redu"
              onPress={submitReservationHandler}
            />
        </View>
      </View>
    </View>
  );
};

export default makereservation;

const styles = StyleSheet.create({
  coverLogo: {
    position: "absolute",
    display: 'flex',
    alignSelf:'center',
    marginTop:20,
  },
  checkbox: {
    marginRight: 10, // Space between checkbox and label
  },
  message: {
    fontSize: 30,
    padding: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },

  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 30,

    color: "#fff",
    fontWeight: "900",
    display: "flex",
    justifyContent: "center",
  },
  position: {
    fontSize: 20,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    alignItems: "center",
    position: 'absolute',
    top: 250,
    width: "100%",
  },
  dateData: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
  coverImage: {
    width: "100%",
    opacity: 0.25,
  },
  whiteLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "#fff", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
});

















