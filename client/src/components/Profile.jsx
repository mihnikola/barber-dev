import { createRef, useEffect, useState } from "react"
import { LABEL_VALUES } from "../constants"
import Wrapper from "../container/Wrapper"
import axios from "axios"
import InputItem from "./InputItem"
import { FcAddImage } from "react-icons/fc"
import placeholderImg from '../assets/images/placeholderImg.jpg';
import { ToastContainer, toast } from "react-toastify"

const Profile = () => {
    const tokenData = localStorage.getItem('token');

    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState(null);
    const [userId, setUserId] = useState(null);
    const fileInputRef = createRef();  // Ref to the file input

    useEffect(() => {
        if (tokenData) {
            getUserData();
        }
    }, []);



    const getUserData = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/users/${tokenData}`)
                .then((res) => {
                    if (res.status === 200) {
                        const { name, image, _id } = res.data;
                        setUserImage(image || placeholderImg);
                        setUserName(name);
                        setUserId(_id);
                    }
                }

                ).catch((e) => console.log(e))

        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: userName,
            image: userImage
        }
        submitData(userData);

    }
    const submitData = async (data) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                params: {
                    name: data.name,
                    image: data.image
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    toast(resp.data.message)
                }
            }).catch((e) => console.log(e))
        } catch (error) {

            console.log(error);
        }

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
                setUserImage(reader.result);
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
    return (
        <Wrapper>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex flex-col justify-center items-center w-full mt-50">
                    {userImage && <img src={userImage} alt="Image Preview" className="text-white w-1/2" />}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}  // Hide the input
                        ref={fileInputRef}  // Link to the ref
                    />
                    <button onClick={handleButtonClick} className="bg-gray-200 w-6/12 p-1 flex items-center justify-center">
                        <FcAddImage size={50} />
                        <span className="font-semibold">{LABEL_VALUES.CHOOSE_IMG}</span> {/* This can be replaced with an icon */}
                    </button>
                </div>
                <InputItem setUserName={setUserName} userName={userName} placeholder={userName || "Unesite vase ime..."} />

                <button type="submit" className="mb-2 w-full cursor-pointer bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600">
                    {LABEL_VALUES.SUBMIT}
                </button>

            </form>

            <ToastContainer theme="dark" />
        </Wrapper>
    )
}

export default Profile