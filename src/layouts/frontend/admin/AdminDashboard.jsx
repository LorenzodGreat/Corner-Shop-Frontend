import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  Swal  from 'sweetalert2';

export default function AdminDash() {
    const people = [
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        // More people...
    ]

    const navigate = useNavigate();

    const Toast2 = Swal.mixin({
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

    const deleteUser = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.post(`api/Delete-User/${id}`).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                })
                navigate('/Admin/Dashboard');
                // thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                Toast2.fire({
                    icon: 'warnig',
                    title: res.data.message,
                })
                thisClicked.innerText = "Delete";
            }
        })

    }

    const restoreUser = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Restoring";

        axios.post(`api/Restore-User/${id}`).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                })
                navigate('/Admin/Dashboard');
                // thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                Toast2.fire({
                    icon: 'warnig',
                    title: res.data.message,
                })
                thisClicked.innerText = "Delete";
            }
        })

    }

    const [current, setCurrent] = useState(1)
    const [per, setPerPage] = useState(4)
    const [post, setCategory] = useState([])

    useEffect(() => {

        axios.get(`api/Index`).then(res => {
            if (res.status === 200) {

                setCategory(res.data.user);
            }
        });

    }, []);

    const LastPost = current * per;
    const FirstPost = LastPost - per;
    const CurrentPost = post.slice(FirstPost, LastPost);


    return (<>
        <div class="max-w-6xl -mt-6 mb-2 mx-auto px-4 sm:px-6 lg:px-8">
            {/* <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2> */}
            <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* <!-- Card --> */}
                <div class="bg-gradient-to-r from-sky-800 to-cyan-600 bg-opacity-75 overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                {/* <!-- Heroicon name: outline/scale --> */}
                                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-lg font-medium text-white truncate">Total Products</dt>
                                    <dd>
                                        <div class="text-lg font-medium text-gray-900">
                                            {/* {total} */}3
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-5 py-3">
                        <div class="text-sm">
                            <a href="/Seller/Products" class="font-medium text-cyan-700 hover:text-cyan-900"> View all </a>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-sky-800 to-cyan-600 bg-opacity-75 overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                {/* <!-- Heroicon name: outline/scale --> */}
                                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-lg font-medium text-white truncate">Sold Products</dt>
                                    <dd>
                                        <div class="text-lg font-medium text-gray-900">0</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-5 py-3">
                        <div class="text-sm">
                            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900"> View all </a>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-sky-800 to-cyan-600 bg-opacity-75 overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                {/* <!-- Heroicon name: outline/scale --> */}
                                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-lg font-medium text-white truncate">Deleted Products</dt>
                                    <dd>
                                        <div class="text-lg font-medium text-gray-900">0</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-5 py-3">
                        <div class="text-sm">
                            <a href="/Seller/Products/Deleted" class="font-medium text-cyan-700 hover:text-cyan-900"> View all </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-1 overflow-x-auto sm:-mx-1 lg:-mx-2">
                    <div className="inline-block min-w-full py-2 align-middle md:px-2 lg:px-2">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr className="divide-x divide-gray-200">
                                        <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                            Id #
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Modify
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {CurrentPost.map((person) => (
                                        <tr key={person.email} className="divide-x divide-gray-200">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{person.id}</td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                {person.name}
                                            </td>
                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500">{person.telephone}</td>
                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500">{person.email}</td>
                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                                {person.status == 0 ?
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            Active
                                                        </span>
                                                    </td>
                                                    :
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                                            Not Active
                                                        </span>
                                                    </td>
                                                }
                                            </td>
                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                                {person.status == 0 ?
                                                    <button
                                                        onClick={(e) => deleteUser(e, person.id)}
                                                        type="button"
                                                        className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    >
                                                        Delete
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={(e) => restoreUser(e, person.id)}
                                                        type="button"
                                                        className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    >
                                                        Restore
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}