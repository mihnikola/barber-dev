// Dummy data for Services and Employees
export const servicesData = [
  { id: 1, name: "Haircut", price: 1200, duration: 40 },
  { id: 2, name: "Massage", price: 2000, duration: 80 },
  { id: 3, name: "Manicure", price: 2540, duration: 120 },
];
import logoImg from "../assets/images/logoImage.png";

export const LABEL_VALUES = {
  PAGE_NOT_FOUND: "PAGE NOT FOUND",
  GET_RESERVATION:"Pregled",
  ADD_RESERVATION:"Rezervacija",
  ADD_SERVICE:"Usluge",
  EDIT_SERVICE:"Izmeni uslugu",
  ADD_EMPLOYEE:"Dodaj zaposlenog",
  SCHEDULE: "Zakaži termin",
  NO_RESERVATIONS:"Trenutno nema rezervacija za dati datum.",
  SCHEDULES: "Termini",
  FORM_EMPLOYEE: "Forma za unos radnika",
  FORM_SERVICE: "Forma usluga",
  LOADING:"Molim sačekajte...",
  CHOOSE_IMG: "Dodaj sliku",
  LOGO_IMG: logoImg,
  REGISTER: "Registracija",
  LOGIN: "Prijava",
  FORM_RESERVATION: "Forma za rezervaciju",
  BTN_RESERVATION: "Zakaži termin",
  LOGOUT: "Odjava",
  PROFILE: "Moj profil",
  SUBMIT: "Pošalji"
}

export const employeesData = [
  { id: 1, name: "John Doe", position: "Top barber" },
  { id: 2, name: "Jane Smith", position: "Pro massager" },
  { id: 3, name: "Alex Johnson", position: "Dermatologist" },
  { id: 4, name: "Michael Jordan", position: "Top barber" },
];

export const availableTimes = [
  { id: 1, value: "09:00" },
  { id: 2, value: "09:10" },
  { id: 3, value: "09:20" },
  { id: 4, value: "09:30" },
  { id: 5, value: "09:40" },
  { id: 6, value: "09:50" },
  { id: 7, value: "10:00" },
  { id: 8, value: "10:10" },
  { id: 9, value: "10:20" },
  { id: 10, value: "10:30" },
  { id: 11, value: "10:40" },
  { id: 12, value: "10:50" },
  { id: 13, value: "11:00" },
  { id: 14, value: "11:10" },
  { id: 15, value: "11:20" },
  { id: 16, value: "11:30" },
  { id: 17, value: "11:40" },
  { id: 18, value: "11:50" },
  { id: 19, value: "12:00" },
  { id: 20, value: "12:10" },
  { id: 21, value: "12:20" },
  { id: 22, value: "12:30" },
  { id: 23, value: "12:40" },
  { id: 24, value: "12:50" },
  { id: 25, value: "13:00" },
  { id: 26, value: "13:10" },
  { id: 27, value: "13:20" },
  { id: 28, value: "13:30" },
  { id: 29, value: "13:40" },
  { id: 30, value: "13:50" },
  { id: 31, value: "14:00" },
  { id: 32, value: "14:10" },
  { id: 33, value: "14:20" },
  { id: 34, value: "14:30" },
  { id: 35, value: "14:40" },
  { id: 36, value: "14:50" },
  { id: 37, value: "15:00" },
  { id: 38, value: "15:10" },
  { id: 39, value: "15:20" },
  { id: 40, value: "15:30" },
  { id: 41, value: "15:40" },
  { id: 42, value: "15:50" },
  { id: 43, value: "16:00" },
  { id: 44, value: "16:10" },
  { id: 45, value: "16:20" },
  { id: 46, value: "16:30" },
  { id: 47, value: "16:40" },
  { id: 48, value: "16:50" },
  { id: 49, value: "17:00" },
];

export const reservationsData = [
  {
    id: 1,
    date: "2025-02-06",
    value: "10:10",
    serviceData: {
      id: 1,
      name: "Haircut",
      price: 100.0,
      duration: 20,
    },
    employeeData: {
      id: 1,
      name: "John Doe",
      position: "Top barber",
    },
    customerData: {
      id: 1,//id null
      name: "Filip Jackson",
    },
  },
  {
    id: 1,
    date: "2025-02-06",
    value: "23:00",
    serviceData: {
      id: 1,
      name: "Haircut",
      price: 100.0,
      duration: 20,
    },
    employeeData: {
      id: 1,
      name: "John Doe",
      position: "Top barber",
    },
    customerData: {
      id: 1,//id null
      name: "Filip Jackson",
    },
  },
  {
    id: 1,
    date: "2025-02-06",
    value: "23:00",
    serviceData: {
      id: 1,
      name: "Haircut",
      price: 100.0,
      duration: 20,
    },
    employeeData: {
      id: 1,
      name: "John Doe",
      position: "Top barber",
    },
    customerData: {
      id: 1,//id null
      name: "Filip Jackson",
    },
  },
  {
    id: 1,
    date: "2025-02-06",
    value: "23:00",
    serviceData: {
      id: 1,
      name: "Haircut",
      price: 100.0,
      duration: 20,
    },
    employeeData: {
      id: 1,
      name: "John Doe",
      position: "Top barber",
    },
    customerData: {
      id: 1,//id null
      name: "Filip Jackson",
    },
  },
  {
    id: 1,
    date: "2025-02-06",
    value: "23:00",
    serviceData: {
      id: 1,
      name: "Haircut",
      price: 100.0,
      duration: 20,
    },
    employeeData: {
      id: 1,
      name: "John Doe",
      position: "Top barber",
    },
    customerData: {
      id: 1,//id null
      name: "Filip Jackson",
    },
  },
  {
    id: 1,
    date: "2025-02-06",
    value: "23:00",
    serviceData: {
      id: 1,
      name: "Haircut",
      price: 100.0,
      duration: 20,
    },
    employeeData: {
      id: 1,
      name: "John Doe",
      position: "Top barber",
    },
    customerData: {
      id: 1,//id null
      name: "Filip Jackson",
    },
  },
];
