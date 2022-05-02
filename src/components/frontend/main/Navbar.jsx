import axios from 'axios';
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Logo from "../main/asset/logo-top-1.png";
import { useState, useEffect } from 'react'
import Drop from './DropMenu';

export default function Navbar(props) {

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

    const [list, setCategoryList] = useState([]);

    useEffect(() => {

        axios.get(`api/Category`).then(res => {
            if (res.status === 200) {

                setCategoryList(res.data.category);
            }
        });

    }, []);

    var Category_HTML =
        list.map((info) => {
            return (
                <div class="relative flex" key={info.id}>


                    <Link to={`collections/${info.name}`} class="border-transparent text-gray-200 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px" id="headlessui-popover-Linkbutton-5" type="button" aria-expanded="false">{info.name}
                    </Link>
                </div>
            )
        });


    const Logout = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                <Navigate to="/login" />
                // navigate('/');
                Toast.fire({
                    icon: 'success',
                    title: 'Logout Successfully'
                });
            }
        });
    }

    var Authbtn = '';
    if (!localStorage.getItem('auth_token')) {
        Authbtn = (
            <Link className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto" to={props.link}>{props.btn}
            </Link>
        );
    } else {
        Authbtn = (
            <button onClick={Logout} className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-indigo-800 rounded-md hover:bg-orange-600 md:mx-0 md:w-auto" type='button'>Logout
            </button>
        );

    }


    return (<>
        <header class="relative"><nav aria-label="Top">
            <div class="bg-gray-900">
                <div class="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8"><form class="hidden lg:block lg:flex-1">
                </form>
                    <p class="flex-1 text-center text-sm font-medium text-white lg:flex-none">Shop on Jamaica's new upcoming #1 Ecommerce website

                    </p>
                    <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <a href="/register" class="text-sm font-medium text-white hover:text-gray-100">Create an account
                        </a>
                        <span class="h-6 w-px bg-gray-600" aria-hidden="true"></span>
                        <a href="/login" class="text-sm font-medium text-white hover:text-gray-100">Seller</a>
                        <span class="h-6 w-px bg-gray-600" aria-hidden="true"></span>
                        <a href="/login" class="text-sm font-medium text-white hover:text-gray-100">Sign in</a>
                    </div>

                </div>
            </div>
            <div class="bg-gray-900">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="border-b border-gray-200">
                        <div class="h-16 flex items-center justify-between">
                            <div class="hidden h-full lg:flex">
                                <div class="ml-8">
                                    <div class="h-full flex text-white justify-center space-x-8">
                                        <div class=" border-transparent text-gray-200 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-3xl font-semibold border-b-2 -mb-px pt-px">
                                            <Link to={"/"} className='text-amber-600 font-semibold text-3xl'>
                                                <img src={Logo} className="h-20 mb-2" srcset="" />
                                            </Link>
                                        </div>

                                        {Category_HTML}
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex items-center lg:hidden"><button type="button" class="-ml-2 bg-white p-2 rounded-md text-gray-400"><span class="sr-only">Open menu

                            </span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16">

                            </path>
                                </svg>
                            </button>
                                <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500"><span class="sr-only">Search

                                </span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">

                                </path>
                                    </svg>
                                </a>
                            </div>
                            <div class="flex-1 flex items-center justify-end">
                                <div class="flex items-center lg:ml-8">
                                    <div class="flex space-x-6">
                                        <div class="hidden lg:flex">

                                        </div>
                                        <div class="flex">
                                            <div><Drop name='Tevin'/></div>
                                        </div>
                                    </div><span class="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true">

                                    </span>
                                    <div class="flow-root">
                                        <a href="/Cart" class="group -m-2 p-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">

                                        </path>
                                        </svg><span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0

                                            </span><span class="sr-only">items in cart, view bag

                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </header>
    </>);
}
