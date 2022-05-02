import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

function EditCategory() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [addCategory, AddNow] = useState({
        name: '',
        error_list: [],
    });
    const [imageNew, setImg] = useState({
        img: '',
        error_list: [],
    });
    ///////////////////////////////////////////////////////////////
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

    const handle = (e) => {
        e.persist();
        AddNow({ ...addCategory, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setImg({ img: e.target.files[0] });
    }

    const UpdateCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', addCategory.name);
        formData.append('img', imageNew.img);

        axios.post(`api/Update-Category/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                });
             <Navigate to={"/Admin/Category"}/>
                // document.getElementById('cat_form').reset();
            }
            else if (res.data.staus === 422) {
                setError(res.data.validator_errors);
            } else if (res.data.status === 404) {
                Toast2.fire({
                    icon: 'warnig',
                    title: res.data.message,
                })
            }
        });
    }

    const { id } = useParams();
    useEffect(() => {
        axios.get(`/api/Category/Edit-Category/${id}`).then(res => {
            if (res.data.status === 200) {
                AddNow(res.data.category);
                setImg(res.data.category);
            } else if (res.data.status === 404) {
                Toast2.fire({
                    icon: 'warnig',
                    title: res.data.message
                });
            }
            setLoading(false);
        });
    }, [id]);
    if (loading) {
        return <>Loading Category..................</>
    }

    return (<>
        <div className="text-center bg-white bg-opacity-40">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Cornershop Jamaica</span>
                <span className="block text-indigo-600 xl:inline">Edit Category</span>
            </h1>
            <p className="mt-3 max-w-md mb-6 mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Add any Cateory of your choice and the image and name of the cateegory will be avialable for Seller and Costumer use.
                It will allso be displayed globaly.
            </p>
        </div>


        <div className='flex'>
            <div className='px-4 py-8 rounded-lg w-max shadow-xl bg-amber-500 bg-opacity-75 mx-auto'>
                <form onSubmit={UpdateCategory} encType='multipart/form-data' id='cat_form'>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <div className="mt-1">
                        <input
                            onChange={handle}
                            type="text"
                            name="name"
                            placeholder={addCategory.name}
                            id="name"
                            className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 outline-orange-600 p-4 block w-full sm:text-sm border-gray-300 rounded-md"
                        />

                        <span className='text-red-500'>{error.name}</span>
                    </div>

                    <label htmlFor="name" className="block mt-6 text-sm font-medium text-gray-700">
                        Previous Category Photo
                    </label>
                    <div className="mt-1 flex">
                        <img className="mr-6" src={`http://127.0.0.1:8000/${imageNew.img}`} width="200px" alt="opps" />
                        <input
                            onChange={handleImage}
                            type="file"
                            multiple accept="image/*"
                            name="img"
                            id="img"
                            className="shadow-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 outline-orange-600 p-4 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <span className='text-red-500'>{error.img}</span>

                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default EditCategory;