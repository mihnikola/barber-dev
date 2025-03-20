import { MdOutlineGroupRemove, MdOutlineModeEdit } from "react-icons/md"
import placeholderImg from  '../assets/images/placeholderImg.jpg';

const GetServices = ({ data,edit,remove }) => {
    return (
        <div className="bg-gray-300 overflow-y-scroll max-h-[200px]   flex justify-around flex-col p-1">
            <table className="min-w-[300px] overflow-x-scroll ">
                <tbody className="m-10 overflow-x-scroll">
                    {data?.map((employee, index) => (
                        <tr key={index} >
                            <td className="p-1"><img src={employee.image.includes('blob') ? placeholderImg : employee.image} alt="Avatar" className="max-w-12 max-h-12 min-w-5" /></td>
                            <td className="p-1 text-sm">{employee.name}</td>
                            <td className="p-1 text-sm">{employee.duration}<br />{"Min"}</td>
                            <td className="p-1 text-sm">{employee.price}<br /> {"RSD"}</td>
                            <td className="p-1"><MdOutlineModeEdit onClick={() => edit(employee)} /></td>
                            <td className="p-1"><MdOutlineGroupRemove onClick={() => remove(employee)} /></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default GetServices