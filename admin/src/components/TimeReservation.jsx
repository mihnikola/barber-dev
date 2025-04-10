/* eslint-disable react/prop-types */
// src/components/TimeReservation.js


// eslint-disable-next-line react/prop-types
const TimeReservation = ({ onTimeSelect, selectedTime, data }) => {
    return (
        <div className="grid grid-cols-3 gap-4 ">
            {data.map((item) => (
                <span
                    key={item._id}
                    onClick={() => onTimeSelect(item.value)}
                    className={`py-2 px-4 border rounded-md cursor-pointer text-sm ${selectedTime === item.value ? 'bg-gray-400 text-black' : 'bg-gray-600 text-white'} hover:bg-gray-400 focus:outline-none`}
                >
                    {item.value}
                </span>
            ))}
        </div>
    );
};

export default TimeReservation;
