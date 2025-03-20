export const readZoneTime = (dateVal) => {
  const dateValue = dateVal.toLocaleDateString("en-GB");
  const [day, month, year] = dateValue.split("/");
  const dateProm = new Date(year, month - 1, day);
  const tzoffset = dateProm.getTimezoneOffset() * 160000; //offset in milliseconds
  const localISOTimeDate = new Date(dateProm - tzoffset).toISOString();
  return localISOTimeDate;
};
export const sortData = (data) => {
  const sortReservation = data.sort((a, b) => {
    const [hoursA, minutesA] = a.time.split(":").map(Number);
    const [hoursB, minutesB] = b.time.split(":").map(Number);

    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
    return minutesA - minutesB;
  });
  return sortReservation;

};
