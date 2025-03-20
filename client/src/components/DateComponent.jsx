/* eslint-disable react/prop-types */
import DatePicker from 'react-datepicker'

const DateComponent = ({ handleDateChange, selectedDate }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            isClearable
            placeholderText="Izaberi datum..."
            className="sm:w-full px-10 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm w-[220px]"
        />

    )
}

export default DateComponent