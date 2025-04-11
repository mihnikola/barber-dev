import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Summary from "@/shared-components/Summary";
import NotSummary from "@/shared-components/NotSummary";
import Details from "@/shared-components/Details";
import FlatButton from "@/shared-components/Button";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import ReservationContext from "@/context/ReservationContext";
import { useNavigation } from "expo-router";
import axios from "axios";
import Storage from "expo-storage";
import Loader from "@/components/Loader";
import { getStorage } from "@/helpers";

// Set up locale for Serbian language
LocaleConfig.locales["srb"] = {
  monthNames: [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Octobar",
    "Novembar",
    "Decembar",
  ],
  dayNames: [
    "Nedelja",
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Cetvrtak",
    "Petak",
    "Subota",
  ],
  dayNamesShort: ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"],
};
LocaleConfig.defaultLocale = "srb";

const DateComponent = () => {
  const currentDate = new Date();
  const [selectedMonths, setSelectedMonths] = useState<number>(1);
  const [selected, setSelected] = useState("");
  const { reservation, updateReservation } = useContext(ReservationContext)!; // Access context  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenProm,setTokenProm] = useState(null);

  // Format the current date
  const [timesData, setTimesData] = useState([]);
  const formattedDate = currentDate?.toISOString()?.split("T")[0];
  // const formattedDate = currentDate;
  // Function to check if the date is Sunday
  const isSunday = (date: string): boolean => {
    const dayOfWeek = new Date(date).getDay(); // getDay() returns 0 for Sunday
    return dayOfWeek === 0;
  };
  useEffect(()=>{
    getStorage()
    .then((res) => {
      console.log("ajasdjasjdhjasdhasjdg ", res);
      setTokenProm(res);
      
    })
    .catch((erro) => console.log("e", erro));

  },[])


  const getTimesData = async (dayData) => {
    if(dayData){

    setIsLoading(true);
    setTimesData([]);
    getMFTimes(dayData);
  }
  }
    

  const getMFTimes = async (date) => {
    const { employer, service } = reservation;

    const serviceData = {
      id: service._id,
      duration: service.duration,
    };
    const employerData = {
      id: employer.id,
    };
    const dateValue = convertDateRequest(date);
    updateReservation({ ...reservation, dateReservation: dateValue });
    console.log("ispred poziva",tokenProm);
    try {
      await axios
        .get(`${process.env.EXPO_PUBLIC_API_URL}/times`, {
          params: {
            date: dateValue,
            employer: employerData,
            service: serviceData,
          },
          headers: { Authorization: `${tokenProm}` },
        })
        .then((res) => {
          console.log("uuuu poziva", res.data);

          if (res.request?.status === 200) {
            setTimesData(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log("errorrrr", err.request));
    } catch (error) {
      console.log("gresketina", error);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const reportHandler = () => {
    const { employer, service, timeData, dateReservation } = reservation;
    if (employer && service && timeData && dateReservation) {
      navigation.navigate("components/reservation/index");
    }
    // // console.log("eeee",employer._id);
    // // console.log("sss",service._id);
    // // console.log("timeData",timeData.value);
    // // console.log("dateReservation+++",dateReservation);
    // const tokenData = await Storage.getItem({ key: "token" });

    // try {
    //   await axios
    //     .post("http://10.58.158.121:5000/reservations", {
    //       params: {
    //         employerId: employer._id,
    //         service_id: service._id,
    //         time: timeData.value,
    //         date: dateReservation,
    //         customer:"",
    //         token: tokenData
    //       },
    //       headers: { Authorization: `${tokenData}` },
    //     })
    //     .then((res) => {
    //       console.log("res", res);

    //       if (res.request?.status === 201) {
    //         console.log("res", res.data);
    //         // setTimesData(res.data);
    //         navigation.navigate("reservation");

    //       }
    //     })
    //     .catch((err) => console.log("errorrrr", err));
    // } catch (error) {
    //   console.log("error", error);
    // }

    // // // updateReservation({ ...reservation, dateData: { data } });
    // // // console.log("reservation",employer._id, service._id,);
  };

  const convertDateRequest = (dateObj) => {
    const date = new Date(dateObj.timestamp);
    date.setHours(2);
    date.setMinutes(40);
    return date.toISOString();
  };

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ display: "flex", width: "auto" }}>
        <CalendarList
          style={{
            borderWidth: 1,
            borderColor: "gray",
            backgroundColor: "transparent",
            display: "flex",
            width: "100%",
          }}
          theme={{
            monthTextColor: "white",
            backgroundColor: "white",
            calendarBackground: "black",
            textSectionTitleColor: "white",
            selectedDayBackgroundColor: "white",
            selectedDayTextColor: "black",
            todayTextColor: "white",
            dayTextColor: "white",
            textMonthFontWeight: "bold",
            textDisabledColor: "grey",
          }}
          onVisibleMonthsChange={(months) => setSelectedMonths(months[0].month)}
          current={formattedDate}
          futureScrollRange={2}
          markedDates={{
            [selected]: {
              selected: true,
            },
          }}
          onDayPress={(day) => {
            if (!isSunday(day.dateString)) {
              setSelected(day.dateString);
              getTimesData(day);
            }
          }}
          showScrollIndicator={true}
          pastScrollRange={0}
          horizontal={true}
          pagingEnabled={true}
          minDate={formattedDate}
          hideExtraDays={true}
        />
      </View>
      <View style={{ display: "flex" }}>
        {timesData.length > 0 && !isLoading && <Summary data={timesData} />}
        {timesData.length === 0 && !isLoading && <NotSummary />}
        {isLoading && (
          <Text style={{ textAlign: "center" }}>
            {" "}
            <Loader />
          </Text>
        )}
        {reservation && <Details data={reservation} />}
      </View>
      <View style={{ marginTop: 20 }}>
        <FlatButton text="Nastavi" onPress={reportHandler} />
      </View>
    </View>
  );
};

export default DateComponent;
