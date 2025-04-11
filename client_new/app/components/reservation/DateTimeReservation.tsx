import { getStorage } from "@/helpers";
import { useEffect, useState } from "react";
import LoginScreen from "../login";
import DateComponent from "./DateComponent";

const DateTimeReservation = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(null);
   
     useEffect(() => {
       getStorage()
         .then((res) => {
           if (res) {
             setIsLoggedIn(res);
           } else {
             setIsLoggedIn(null)
           }
         })
         .catch((error) => console.log("error", error));
     }, []);
   
  return (
    <>{isLoggedIn ? <DateComponent /> : <LoginScreen />}</>

  )
}

export default DateTimeReservation

