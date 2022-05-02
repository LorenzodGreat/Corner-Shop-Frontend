import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainNav from '../frontend/components/Nav';
import NavAuth from '../frontend/components/NavAuth';
// import Navbar from '../../../layouts/frontend/Navbar';
function Register() {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    const navigate = useNavigate();

    const [registerInput, RegisterNow] = useState({
        name: '',
        email: '',
        password: '',
        telephone: '',
        error_list: [],
    });

    const handle = (e) => {
        e.persist();
        RegisterNow({ ...registerInput, [e.target.name]: e.target.value })
    }

    const RegisterSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            telephone: registerInput.telephone,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    navigate('/user/dashboard');
                    Toast.fire({
                        icon: 'success',
                        title: res.data.message
                    })
                } else {
                    RegisterNow({ ...registerInput, error_list: res.data.validator_errors })
                }
            });
        });
    }

    var Auth = '';
    if (!localStorage.getItem('auth_token')) {
        Auth = (
            <MainNav />
        );
    } else {
        Auth = (
            <NavAuth />
        );

    }

    return (<>
    {Auth}
        <center className='flex place-content-center'>
            <div className="w-full bg-opacity-75 h-max my-auto max-w-sm overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800">
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">CornershopJa</h2>

                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome User</h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Create A New CornershopJa Account</p>

                    <form onSubmit={RegisterSubmit}>
                        <div className="w-full mt-4">
                            <input onChange={handle} value={registerInput.name} name="name" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Full Name" aria-label="Full Name" />
                            <span className='text-red-500'>{registerInput.error_list.name}</span>
                        </div>

                        <div className="w-full mt-4">
                            <input onChange={handle} value={registerInput.email} name="email" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Email Address" aria-label="Email Address" />
                            <span className='text-red-500'>{registerInput.error_list.email}</span>
                        </div>

                        <div className="w-full mt-4">
                            <input onChange={handle} value={registerInput.telephone} name="telephone" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Phone" aria-label="Phone" />
                            <span className='text-red-500'>{registerInput.error_list.telephone}</span>
                        </div>

                        <div className="w-full mt-4">
                            <input onChange={handle} value={registerInput.password} name="password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                            <span className='text-red-500'>{registerInput.error_list.password}</span>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">Register</button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-1 text-center bg-opacity-75 bg-gray-50 dark:bg-gray-700">
                    <Link to={'/login'} className="text-sm text-gray-600 dark:text-gray-200">Already Have An Account ?? </Link>
                </div>
            </div>
            <img style={{ width: '45%' }} className='-ml-4 p-2 -z-10 w-2/4' src={'https://images.unsplash.com/photo-1605994543054-6ffbabbd8139?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80'} alt="" />
        </center>
    </>);
}

export default Register;