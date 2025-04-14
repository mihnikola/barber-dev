// Custom hook for handling the reservation submission
import { post } from "@/api/apiService";
import ReservationContext from "@/context/ReservationContext";
import { getStorage } from "@/helpers";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";

const useSubmitReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { reservation } = useContext(ReservationContext);
  const [responseData, setResponseData] = useState(null);

  const submitReservation = useCallback(
    async (tokenData) => {
      setIsLoading(true);
      setError(null);
      const { employer, service, timeData, dateReservation } = reservation;

      if (!employer || !service || !timeData || !dateReservation) {
        setError("Missing reservation details. Please check your selection.");
        setIsLoading(false);
        return;
      }
      

      try {
        const response = await post('/reservations', {
            params: {
              employerId: employer.id,
              service_id: service.id,
              time: timeData.value,
              date: dateReservation,
              customer: "", //  Where is this data coming from?
              token: tokenData,

            },
          }
        );
        setResponseData(response);
        console.log("setResponseData",response)
        navigation.navigate("components/reservation/makereservation"); // Make sure this path is correct
        setIsLoading(false);
      } catch (err) {
        console.error("Error submitting reservation:", err);
        setError(
          err.message ||
            "An unexpected error occurred while submitting your reservation."
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [navigation, reservation]
  );

  const submitReservationHandler = useCallback(async () => {
    try {
      const tokenData = await getStorage();
      if (tokenData) {
        await submitReservation(tokenData);
      } else {
        setError("Authentication token is missing. Please log in again.");
      }
    } catch (error) {
      console.error("Error getting token:", error);
      setError(
        error.message ||
          "Failed to retrieve authentication token. Please check your storage."
      );
    }
  }, [submitReservation]);

  return { submitReservationHandler, isLoading, error };
};

export default useSubmitReservation;
