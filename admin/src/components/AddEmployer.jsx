import { createRef, useEffect, useState } from "react";
import InputItem from "./InputItem";
import axios from "axios";
import Wrapper from "../container/Wrapper";
import { FcAddImage } from "react-icons/fc";

import { LABEL_VALUES } from "../constants";
import ImageLogo from "./ImageLogo";
import Capture from "./Capture";
import { toast, ToastContainer } from "react-toastify";
import GetEmployees from "./GetEmployees";
const AddEmployer = () => {
    const [employerName, setEmployerName] = useState("");
    const [position, setPosition] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = createRef();
    const tokenData = localStorage.getItem('token');
    const [roleData, setRoleData] = useState(null);
    const [employeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        if (!tokenData) {
            window.location.href = '/';
            return;
        }
        fetchAdminData();


    }, [])


    const fetchAdminData = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/roles`, {
            headers: { Authorization: `${tokenData}` },
        }).then((res) => {
            if (res.status === 200) {
                if (res.data.user.role === 'administrator') {
                    getEmployeesData();
                }
                setRoleData(res.data.user.role);
            }
        }).catch((err) => console.log(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: employerName,
            position,
            image
        };
        submitEmployerHandler(newUser);
    };

    const notify = (text) => {
        toast(text);
    }

    const submitEmployerHandler = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/employees`, {
                params: {
                    name: data.name,
                    position: data.position,
                    image: data.image
                },
                headers: { Authorization: `${tokenData}` },


            }).then((res) => {
                if (res.request?.status === 201) {
                    notify('Uspešno poslati podaci za radnika')

                }
            })

        } catch (error) {
            console.log(error);
        }

        setEmployerName('');
        setImage(null);
        setPosition('');
        fileInputRef.current = null;
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
            alert("Prevelika slika.");
            e.target.value = ""; // Clear the file input
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.onerror = (error) => {
                console.log("Error: ", error);
            };
        }
    };
    const getEmployeesData = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/employees`, {
            headers: { Authorization: `${tokenData}` },
        }).then((res) => {
            if (res.status === 200) {
                setEmployeesData(res.data);
            }
        }).catch((err) => console.log(err));
    }

    if (roleData === 'administrator') {
        return (
            <Wrapper>
                <ImageLogo />
                <Capture title={LABEL_VALUES.FORM_EMPLOYEE} />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputItem setUserName={setEmployerName} userName={employerName} placeholder="Unesi ime radnika" />
                    <InputItem setUserName={setPosition} userName={position} placeholder="Unesi naziv pozicije" />
                    <div className="flex flex-col justify-center items-center ">
                        {image ? <img src={image} alt="Image Preview" className="text-white" /> : null}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}  // Hide the input
                            ref={fileInputRef}  // Link to the ref
                        />
                        <button onClick={handleButtonClick} className="bg-gray-200 w-full p-5 flex items-center justify-center">
                            <span className="font-semibold">{LABEL_VALUES.CHOOSE_IMG}</span> {/* This can be replaced with an icon */}
                        <FcAddImage size={50} />

                        </button>
                    </div>
                    <button type="submit" className="mb-2.5 w-full cursor-pointer bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600">
                        {LABEL_VALUES.ADD_EMPLOYEE}
                    </button>
                </form>
                <ToastContainer theme="dark" />
                {employeesData.length > 0 && <GetEmployees data={employeesData} />}

            </Wrapper>
        )
    }
    if (roleData !== 'administrator') {
        return (
            <Wrapper>
                <ImageLogo />
                <Capture title={LABEL_VALUES.PAGE_NOT_FOUND} />
            </Wrapper>
        )
    }

}
export default AddEmployer