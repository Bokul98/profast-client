import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to="/" className='flex items-end cursor-pointer'>
            <img className='mb-2' src={logo} alt="ProFast Logo" />
            <p className='text-3xl -ml-2 font-extrabold'>ProFast</p>
        </Link>
    );
};

export default ProFastLogo;