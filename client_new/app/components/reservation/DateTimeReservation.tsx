import { getStorage } from "@/helpers";
import { useEffect, useState } from "react";
import DateComponent from "./DateComponent";
import SignForm from "../SignForm/SignForm";

const DateTimeReservation = () => {
  //  const [isLoggedIn, setIsLoggedIn] = useState(null);

  //    useEffect(() => {
  //      getStorage()
  //        .then((res) => {
  //          if (res) {
  //            setIsLoggedIn(res);
  //          } else {
  //            setIsLoggedIn(null)
  //          }
  //        })
  //        .catch((error) => console.log("error", error));
  //    }, []);

  return (
    // <>{isLoggedIn ? <DateComponent /> : <SignForm />}</>
    <DateComponent />
  );
};

export default DateTimeReservation;
