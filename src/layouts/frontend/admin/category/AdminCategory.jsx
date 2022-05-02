import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddModal from '../../../../components/frontend/admin/modal';


export default function AdminCategory() {
    const [loading, setLoading] = useState(true);
    const [list, setCategoryList] = useState([]);
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


    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.post(`api/Delete-Category/${id}`).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                })
                navigate('/Admin/Category');
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

    const restoreCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Restoring";

        axios.post(`api/Restore-Category/${id}`).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                })
                navigate('/Admin/Category');
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

    useEffect(() => {

        axios.get(`api/Category`).then(res => {
            if (res.status === 200) {

                setCategoryList(res.data.category);
            }
            setLoading(false);
        });

    }, []);

    var Category_HTML = '';
    if (loading) {
        return <>Loading Category..................</>
    }
    else {

        var Category_HTML =
            list.map((info) => {
                return (
                    <tr key={info.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={`http://127.0.0.1:8000/${info.img}`} alt="" />
                                </div>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{info.name}</div>
                        </td>
                        {info.status == 0 ?
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
                        <td className="relative space-x-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link
                                to={`Edit-Category/${info.id}`}
                                className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                Edit
                            </Link>


                            {info.status == 0 ?
                  <button
                  onClick={(e) => deleteCategory(e, info.id)}
                  type="button"
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                  Delete
              </button>
                            :
                            <button
                            onClick={(e) => restoreCategory(e, info.id)}
                            type="button"
                            className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            Restore
                        </button>
                        }
                        </td>
                    </tr>
                )
            });
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Category</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <AddModal />
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Image
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Category Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>

                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {Category_HTML}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
