import { useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DateComponent from "./DateComponent";
import { readZoneTime, sortData } from "../helpers";
import Wrapper from "../container/Wrapper";
import { LABEL_VALUES } from "../constants";
import ImageLogo from "./ImageLogo";
import Capture from "./Capture";

const GetReservation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const tokenData = localStorage.getItem('token');

  useEffect(() => {
    fetchReservations(selectedDate);
  }, [selectedDate]);

  const fetchReservations = async (date) => {
    setLoading(true);
    setError("");

    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/reservations`, {
        params: {
          date: readZoneTime(date),
          token: tokenData
        },
        headers: { Authorization: `${tokenData}` },
      }).then((response) => {
        const sortedReservations = sortData(response.data);
        setReservations(sortedReservations);
      })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) {
      setError(`Failed to fetch reservations.`, err);
    } finally {
      setLoading(false);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      fetchReservations(date);
    }
  };
  return (
    <Wrapper>
      <ImageLogo />
      <Capture title={LABEL_VALUES.SCHEDULES} />
      <div className=" text-center font-medium text-white">
        {reservations.length === 0 && !loading && !error && (
          <p className="text-center text-white max-w-[320px] text-xl">
            {LABEL_VALUES.NO_RESERVATIONS}
          </p>
        )}
      </div>
      {loading && <p className="text-center text-gray-500 p-10 text-2xl">{LABEL_VALUES.LOADING}</p>}
      {error && <p className="text-center text-red-600 font-bold">{error}</p>}

      <div className="mt-6 overflow-y-scroll max-h-[400px]">
        {reservations.map((reservation, index) => (
          <div
            key={index}
            className="bg-gray-800 shadow-md rounded-lg p-4 mb-1 sm:min-w-[32em] min-w-[300px]"
          >
            <div className="text-lg font-medium text-white">
              {reservation.time}
            </div>
            <div className="text-lg font-medium text-white">
              {reservation.customer ? reservation.customer : null}
            </div>
            <div className="text-md text-gray-100">
              {reservation.service.name}  {reservation.service.price}{" RSD"}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <DateComponent
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </div>
    </Wrapper>
  );
};
export default GetReservation;