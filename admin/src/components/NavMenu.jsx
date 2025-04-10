import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { LABEL_VALUES } from '../constants';
import axios from 'axios';

const NavMenu = () => {
    const [active, setActive] = useState(0);
    const tokenData = localStorage.getItem('token');
    const [roleData, setRoleData] = useState(null);
    useEffect(() => {
        if (tokenData) {
            fetchAdminData();
        }
    }, [])
    const fetchAdminData = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/roles`, {
            headers: { Authorization: `${tokenData}` },
        }).then((res) => {
            if (res.status === 200) {
                setRoleData(res.data.user.role);
            }
        }).catch((err) => console.log(err));
    }

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = '/';
    }


    return (
        <nav>
            <ul className='bg-gray-800 cursor-pointer md:flex text-white sm:justify-around w-full sm:gap-5 text-lg  text-center items-center'>
                <li className={active === 0 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/reservations" onClick={() => setActive(0)}>{LABEL_VALUES.GET_RESERVATION}</Link></li>
                <li className={active === 1 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/add-reservation" onClick={() => setActive(1)}>{LABEL_VALUES.ADD_RESERVATION}</Link></li>
                {/* {roleData === 'administrator' && <li className={active === 2 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/addEmployer" onClick={() => setActive(2)}>{LABEL_VALUES.ADD_EMPLOYEE}</Link></li>} */}
                {roleData === 'administrator' && <li className={active === 3 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/service" onClick={() => setActive(3)}>{LABEL_VALUES.ADD_SERVICE}</Link></li>}
                <li className={active === 4 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/profile" onClick={() => setActive(4)}>{LABEL_VALUES.PROFILE}</Link></li>
                <li className='p-2'><Link onClick={logout}>{LABEL_VALUES.LOGOUT}</Link></li>
            </ul>
        </nav>
    )

}

export default NavMenu