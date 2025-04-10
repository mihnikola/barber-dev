import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import ReservationContext from "@/context/ReservationContext";
import Button from "@/shared-components/Button";
import Details from "@/shared-components/Details";
import Note from "@/shared-components/Note";
import { useNavigation } from "@react-navigation/native";
import SuccessModal from "@/shared-components/SuccessScreen";
import Storage from "expo-storage";
import axios from "axios";
import { addMinutesToTime, convertDate, getStorage } from "@/helpers";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext);
  const navigation = useNavigation();
  const { employer, service, timeData, dateReservation } = reservation;
  //   const [loading,setLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(false);

  const submitReservationHandler = async () => {
    // await Storage.getItem({ key: "token" })
    //   .then((res) => {
    //     if(res){submitReserve(res)}
    //   })
    //   .catch((r) => console.log("object", r));
    // submitNotification(tokenData);

    getStorage()
      .then((res) => {
        if (res) {
          submitReserve(res);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const submitReserve = async (tokenData: any) => {
    console.log("object reserve ", tokenData);
    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/reservations`, {
          params: {
            employerId: employer.id,
            service_id: service.id,
            time: timeData.value,
            date: dateReservation,
            customer: "",
            token: tokenData,
          },
          headers: { Authorization: `${tokenData}` },
        })
        .then((res) => {
          if (res.request?.status === 201) {
            // console.log("res", res.data);
            // setTimesData(res.data);
            // navigation.navigate("makereservation");
            // submitNotification(tokenData);
            navigation.navigate("components/reservation/makereservation");
          }
        })
        .catch((err) => console.log("errorrrr", err));
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitNotification = async (dataToken: any) => {
    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/notifications`, {
          params: {
            token: dataToken,
          },
          headers: { Authorization: `${dataToken}` },
        })
        .then((res) => {
          if (res.request?.status === 201) {
            console.log("res", res.data);
            // setTimesData(res.data);
            // navigation.navigate("makereservation");
          }
        })
        .catch((err) => console.log("xxxx", err));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <View style={styles.coverContent}>
        <Text style={styles.timeData}>
          {timeData?.value} -{" "}
          {addMinutesToTime(timeData?.value, service.duration)}
        </Text>
        <Text style={styles.dateData}>{convertDate(dateReservation)}</Text>
        <Text style={styles.dateData}>Frizerski Studio - Gentleman</Text>
      </View>
      <View style={{ display: "flex", padding: 10 }}>
        <View>
          {/* <Image source={employer.image} style={styles.image} /> */}
          {reservation && <Details data={reservation} />}
          <Note />

          <View style={styles.reservation}>
            <Button text="Rezerviši" onPress={submitReservationHandler} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  position: {
    fontSize: 16,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 80,
    left: 50,
    padding: 20,
  },
  dateData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
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
});
