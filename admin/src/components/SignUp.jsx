import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../container/Wrapper';
import { LABEL_VALUES } from '../constants';
import ImageLogo from './ImageLogo';
import Capture from './Capture';
import InputItem from './InputItem';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [name, setName] = useState();
    const notify = (text) => toast(text);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Lozinke nisu iste');
            return;
        }
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/admin`, {
                name,
                email,
                password
            }).then((result) => {
                if (result.status === 201) {
                    notify('You are successfully registered! Please, verify your account on your email!')
                    setTimeout(() => {
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setError('');
                        setName('');
                        navigate('/');
                    }, 5000);
                }

            }).catch((error) => {
                notify('Email ili lozinka ime vec postoje', error);
            });
        } catch (error) {
            console.log("firstaaaa", error)
            setError('Error signing up');
        }

    };

    return (
        <Wrapper>
            <ImageLogo />
            <Capture title={LABEL_VALUES.REGISTER} />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <InputItem placeholder="Unesi ime i prezime" setUserName={setName} userName={name} />
                <InputItem type="email" placeholder="Unesi Email" setUserName={setEmail} userName={email} />
                <InputItem type="password" placeholder="Unesi lozinku" setUserName={setPassword} userName={password} />
                <InputItem type="password" placeholder="Potvrdi lozinku" setUserName={setConfirmPassword} userName={confirmPassword} />
                <button
                    type="submit"
                    className="w-full p-3 bg-gray-500 text-white rounded-md cursor-pointer"
                >
                    {LABEL_VALUES.REGISTER}
                </button>
            </form>
            <div className='flex md:flex-row flex-col justify-between mt-10 gap-10'>
                <div className='text-neutral-500 md:text-end text-center' >
                    Ukoliko već imate nalog možete se prijaviti <span className='text-white cursor-pointer' onClick={() => navigate('/')}>ovde.</span>
                </div>
            </div>
            <ToastContainer theme='dark' />
        </Wrapper>
    );
};

export default SignUp;
