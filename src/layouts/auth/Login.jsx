import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainNav from '../frontend/components/Nav';
import NavAuth from '../frontend/components/NavAuth';
import Navbar from './../../components/frontend/main/Navbar';


export default function Login() {
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

    const [LoginInput, LoginNow] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handle = (e) => {
        e.persist();
        LoginNow({ ...LoginInput, [e.target.name]: e.target.value })
    }

    const LoginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: LoginInput.email,
            password: LoginInput.password,
        }



        axios.get('/sanctum/csrf-cookie').then(res => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_email', res.data.email);
                    localStorage.setItem('auth_phone', res.data.phone);
                    localStorage.setItem('auth_role', res.data.role);
                    // console.log
                    const role = localStorage.getItem('auth_role');
                    if (role == 0) {
                        navigate('/User/Dashboard');
                        Toast.fire({
                            icon: 'success',
                            title: 'Welcome Back'.res.data.username
                        })

                    } else {
                        navigate('/Admin/Dashboard');
                        Toast.fire({
                            icon: 'success',
                            title: 'Welcome Back'.res.data.username
                        })
                    }
                }
                else if (res.data.status === 401) {
                    Toast.fire({
                        icon: 'warning',
                        title: res.data.message
                    })
                }
                else {
                    LoginNow({ ...LoginInput, error_list: res.data.validator_errors })
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
        <div className="w-full mt-12  max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800">
            <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">CornershopJa</h2>

                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account today</p>

                <form onSubmit={LoginSubmit}>
                    <div className="w-full mt-4">

                        <input onChange={handle} value={LoginInput.email} name="email" id="email" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
                        <span className='text-red-500'>{LoginInput.error_list.email}</span>
                    </div>

                    <div className="w-full mt-4">
                        <input onChange={handle} value={LoginInput.password} name="password" id="password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                        <span className='text-red-500'>{LoginInput.error_list.password}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">Login</button>
                    </div>
                </form>
            </div>

            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <Link to="/register" className="text-sm text-gray-600 dark:text-gray-200">New To CornershopJa Register Now </Link>
            </div>
        </div>
    </>);
}

