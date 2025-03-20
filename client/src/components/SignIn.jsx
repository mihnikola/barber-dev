import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LABEL_VALUES } from '../constants';
import Wrapper from '../container/Wrapper';
import ImageLogo from './ImageLogo';
import Capture from './Capture';
import { ToastContainer, toast } from 'react-toastify';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const notify = (text) => {
        toast(text);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/login/admin`, {
                email,
                password
            }).then((response) => {
                if (response.data) {
                    const { token } = response.data;
                    localStorage.setItem('token', token); 
                    notify('Login Successfull');
                    setTimeout(() => {
                        window.location.href = '/reservations';
                    }, 3000)
                }
            }).catch((error) => {
                notify(error?.response?.data?.message);
            })


        } catch (error) {
            console.log("SignIn error ", error)
            notify(error);
            setError(error);
        }
    };

    return (
        <Wrapper>
            <ImageLogo />
            <Capture title={LABEL_VALUES.LOGIN} />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <input
                    type="email"
                    className="w-full px-4 py-2 border bg-gray-300 border-gray-300 rounded-md"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full px-4 py-2 border bg-gray-300 border-gray-300 rounded-md"
                    placeholder="Lozinka"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-gray-500 text-white rounded-md cursor-pointer"
                >
                    {LABEL_VALUES.LOGIN}
                </button>
            </form>
            <div className='flex md:flex-row flex-col justify-between mt-10 gap-10'>
                <div className='text-neutral-500 md:text-end text-center' >
                    Ukoliko nemate nalog možete se registrovati <span className='text-white cursor-pointer' onClick={() => navigate('/register')}>ovde.</span>
                </div>
            </div>
            <ToastContainer theme='dark' />
        </Wrapper>
    );
};

export default SignIn;
