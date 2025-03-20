/* eslint-disable react/prop-types */
const InputItem = ({ type, setUserName, userName, placeholder }) => {
    return (
            <input
                type={type || "text"}
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder={placeholder}
                autoComplete='off'
                className="w-full min-w-[100px] px-4 py-2 border bg-gray-300 border-gray-300 rounded-md"
                />
    )
}

export default InputItem