/* eslint-disable react/prop-types */

const SelectItem = ({ data, title, handleItem,value }) => {
  console.log("va;ie",value)
  return (
    <select
      value={value} // Make it a controlled component by binding value here
      onChange={(e) => handleItem(e.target.value)}
      required
      autoComplete="off"
      className="w-full px-4 py-2 border bg-gray-300 border-gray-300 rounded-md"
    >
      <option value="">{title}</option>
      {data.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectItem;