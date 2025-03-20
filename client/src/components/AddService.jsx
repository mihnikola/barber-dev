import { createRef, useEffect, useState } from "react";
import InputItem from "./InputItem";
import axios from "axios";
import Wrapper from "../container/Wrapper";
import { LABEL_VALUES } from "../constants";
import ImageLogo from "./ImageLogo";
import Capture from "./Capture";
import { ToastContainer, toast } from "react-toastify";
import GetServices from "./GetServices";
import { FcAddImage } from "react-icons/fc";
import Modal from "./Modal";

const AddService = () => {
    const [serviceName, setServiceName] = useState("");
    const [serviceDuration, setServiceDuration] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = createRef();  // Ref to the file input
    const [roleData, setRoleData] = useState(null);
    const tokenData = localStorage.getItem('token');
    const [servicesData, setServicesData] = useState([]);
    const [editService, setEditService] = useState(false);
    const [serviceId, setServiceId] = useState(null);
    const [dialogMessage, setDialogMessage] = useState(null);

    const notify = (text) => {
        toast(text);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: serviceName,
            price: servicePrice,
            duration: serviceDuration,
            image: image
        };
        submitServiceHandler(newUser);
    };

    const submitServiceHandler = async (data) => {

        if (!editService) {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/services`, {
                    params: {
                        name: data.name,
                        price: data.price,
                        duration: data.duration,
                        image: data.image
                    },
                    headers: { Authorization: `${tokenData}` },

                }).then((res) => {
                    if (res.request?.status === 201) {
                        notify('Uspešno poslati podaci za servis')
                        getServicesData();

                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
        if (editService) {
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/services/${serviceId}`, {
                    params: {
                        name: data.name,
                        price: data.price,
                        duration: data.duration,
                        image: data.image
                    },
                    headers: { Authorization: `${tokenData}` },

                }).then((res) => {
                    if (res.request?.status === 200) {
                        notify('Uspešno izmenjeni podaci za servis')
                        getServicesData();
                        setEditService(false);

                    }
                })
            } catch (error) {
                console.log(error);
            }

        }

        setServiceDuration('');
        setServiceName('');
        setServicePrice('');
        setImage(null);

    }
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
    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

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
                    getServicesData();
                }
                setRoleData(res.data.user.role);
            }
        }).catch((err) => console.log(err));
    }

    const getServicesData = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/services`, {
            headers: { Authorization: `${tokenData}` },
        }).then((res) => {
            if (res.status === 200) {
                setServicesData(res.data);
            }
        }).catch((err) => console.log(err));
    }

    const editServiceHandler = (data) => {
        setEditService(true);
        const { _id, name, price, duration, image } = data;
        setImage(image);
        setServiceName(name);
        setServicePrice(price);
        setServiceDuration(duration);
        setServiceId(_id);
    }

    const removeServiceHandler = (data) => {
        setServiceId(data._id);
        setDialogMessage('Da li ste sigurni za brisanje servisa');
    }

    const handleConfirm = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/services/${serviceId}`, {
                headers: { Authorization: `${tokenData}` },
            }).then((res) => {
                if (res.status === 200) {
                    setServicesData(servicesData.filter((service) => service._id !== serviceId));
                    setEditService(false);
                }
            }).catch((err) => console.log(err));

        } catch (e) {
            console.log(e);
        }
    };






    if (roleData === 'administrator') {
        return (
            <Wrapper>
                <ImageLogo />
                <Capture title={LABEL_VALUES.FORM_SERVICE} />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputItem setUserName={setServiceName} userName={serviceName} placeholder="Unesi naziv servisa" />
                    <InputItem setUserName={setServicePrice} userName={servicePrice} placeholder="Unesi cenu servisa" />
                    <InputItem setUserName={setServiceDuration} userName={serviceDuration} placeholder="Unesi trajanje servisa u minutima" />
                    <div className="flex flex-col justify-center items-center w-full">
                        {image ? <img src={image} alt="Image Preview" className="text-white" /> : null}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}  // Hide the input
                            ref={fileInputRef}  // Link to the ref
                        />
                        <button onClick={handleButtonClick} className="bg-gray-200 w-full p-5 flex items-center justify-center">
                            <FcAddImage size={50} />
                            <span className="font-semibold">{LABEL_VALUES.CHOOSE_IMG}</span> {/* This can be replaced with an icon */}
                        </button>
                    </div>
                    <button type="submit" className="mb-2 w-full cursor-pointer bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600">
                        {editService ? LABEL_VALUES.EDIT_SERVICE : LABEL_VALUES.ADD_SERVICE}
                    </button>

                </form>
                {servicesData.length > 0 && <GetServices data={servicesData} edit={editServiceHandler} remove={removeServiceHandler} />}
                <ToastContainer theme="dark" />
                <Modal
                    showModal={dialogMessage}
                    setShowModal={setDialogMessage}
                    onConfirm={handleConfirm}
                />
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
export default AddService