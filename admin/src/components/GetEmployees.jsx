// import { MdOutlineModeEdit, MdOutlineGroupRemove } from "react-icons/md";

// import placeholderImg from  '../assets/images/placeholderImg.jpg';

// const GetEmployees = ({ data }) => {
//     return (
//         <div className="bg-gray-300 overflow-y-scroll max-h-[200px] flex justify-around flex-col p-1">
//             <table>
//                 <tbody className="m-10">
//                     {data?.map((employee, index) => (
//                         <tr key={index} >
//                             <td className="p-1"><img src={employee.image.includes('blob') ?  placeholderImg : employee.image} alt="Avatar" className="w-12 h-12" /></td>
//                             <td>{employee.name}</td>
//                             <td>{employee.position}</td>
//                             <td className="p-1"><MdOutlineModeEdit onClick={() => editHandler(employee)} /></td>
//                             <td className="p-1"><MdOutlineGroupRemove onClick={() => removeHandler(employee)} /></td>
//                         </tr>
//                     ))}

//                 </tbody>
//             </table>
//         </div>

//     )
// }

// export default GetEmployees