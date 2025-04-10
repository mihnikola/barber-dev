import { useEffect, useState } from "react";
import SelectItem from "./SelectItem";
import InputItem from "./InputItem";
import DateComponent from "./DateComponent";
import TimeReservation from "./TimeReservation";
import axios from "axios";
import { readZoneTime } from "../helpers";
import Wrapper from "../container/Wrapper";
import { LABEL_VALUES } from "../constants";
import ImageLogo from "./ImageLogo";
import Capture from "./Capture";
import { ToastContainer, toast } from 'react-toastify';

const AddReservation = () => {
  const [userName, setUserName] = useState("");
  const [service, setService] = useState("");
  const [employee, setEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  // const [employeesData, setEmployeesData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [timesData, setTimesData] = useState([]);
  const token = localStorage.getItem('token');


  const notify = (text) => {
    toast(text);
  }
  useEffect(() => {
    fetchServiceData(token);
  }, []);

  // const fetchEmpData = async (data) => {
  //   try {
  //     const responseEmployees = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/employees`, {
  //       headers: { Authorization: `${data}` },
  //     }
  //     );
  //     setEmployeesData(responseEmployees.data);
  //   } catch (e) {
  //     console.log("Error fetching employees data", e);
  //   }
  // };

  const fetchServiceData = async (data) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/services`, {
        headers: { Authorization: `${data}` },
      }
      ).then((response) => {
        setServicesData(response.data);
      }).catch((err) => {
        console.error(err);
      });
    } catch (e) {
      console.log("Error fetching services data", e);
    }
  };

  const fetchTimesData = async (dateValue, serviceValue) => {
    const service = {
      id: serviceValue._id,
      duration: serviceValue.duration
    }
    try {

      await axios.get(`${import.meta.env.VITE_API_URL}/times`, {
        params: {
          date: dateValue,
          service,
          token
        },
        headers: { Authorization: `${token}` },
      }).then((response) => {
        setTimesData(response.data)
      }
      );
    } catch (e) {
      console.log("Error fetching time data", e);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (service) {
      fetchTimesData(readZoneTime(date), service);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const dateValue = readZoneTime(selectedDate);
    const newUser = {
      customer: userName,
      service_id: service._id,
      date: dateValue,
      time: selectedTime,
    };

    submitReservationHandler(newUser);

  };
  const submitReservationHandler = async (data) => {
    const { customer, service_id, date, time } = data;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reservations`, {
        params: {
          customer,
          service_id,
          date,
          time,
          token,
          employerId: ""
        },
        headers: { Authorization: `${token}` },
      }
      ).then((res) => {
        if (res.request?.status === 201) {
          notify("Uspešno ste rezervisali termin");
          setService("");
          setUserName("");
          setEmployee("");
          setSelectedTime("");
          setSelectedDate(null);
          // handleChangeEmployee(null);
          setTimesData([]);
        }
      });

    } catch (e) {
      console.log("Error fetching time data", e);
    }
  };
  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Set selected time in state
  };

  const handleChangeService = (id) => {
    if (id) {
      const serviceData = servicesData.find((service) => service._id === id);
      setService(serviceData);
      if (selectedDate) {
        fetchTimesData(readZoneTime(selectedDate), serviceData);
      }
    }
  };
  // const handleChangeEmployee = (id) => {
  //   if (id) {
  //     const employeeData = employeesData.find((service) => service._id === id);
  //     setEmployee(employeeData);
  //     if (selectedDate && service) {
  //       fetchTimesData(readZoneTime(selectedDate), service, employeeData);
  //     }
  //   }
  // };


  return (
    <Wrapper>
      <ImageLogo />
      <Capture title={LABEL_VALUES.FORM_RESERVATION} />
      <div className="shadow-md rounded-lg p-4 mb-1 sm:min-w-[32em] min-w-[300px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputItem setUserName={setUserName} userName={userName} placeholder="Ime mušterije" />
          <SelectItem
            data={servicesData}
            handleItem={handleChangeService}
            title="Izaberi usluge"
            value={service?._id || ""}
          />
          {/* <SelectItem
            data={employeesData}
            handleItem={handleChangeEmployee}
            title="Izaberi barbera"
            value={employee?._id || ""}
          /> */}
          {userName.length > 2 && (
            <div className="flex items-center justify-center">
              <DateComponent
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
          )}
          {selectedDate && userName && timesData.length > 0 && (
            <div className=" max-h-[300px] overflow-y-scroll">
              <TimeReservation
                data={timesData}
                onTimeSelect={handleTimeSelect}
                selectedTime={selectedTime}
              />
            </div>
          )}
          <button
            type="submit"
            className="mb-20 mt-5 w-full cursor-pointer bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600"
          >
            {LABEL_VALUES.BTN_RESERVATION}
          </button>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </Wrapper>
  );
};

export default AddReservation;
