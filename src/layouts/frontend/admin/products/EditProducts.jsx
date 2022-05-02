import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

function EditProduct() {

    function Next() {
        document.getElementById('1').className = `hidden`;
        document.getElementById('2').className = `bg-gradient-to-r from-cyan-600 to-sky-800 font-semibold text-white transition duration-700 ease-in-out w-max shadow-lg mx-auto h-max my-auto sm:rounded-lg sm:p-6`;
        document.getElementById('section1').className = `bg-amber-600 w-10 h-10 flex items-center justify-center rounded-full`
        document.getElementById('section1').innerHTML = `<svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`
        document.getElementById('section_2').className = `absolute top-0 left-0 w-1 h-full bg-amber-500 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto`
    }

    function Back() {
        document.getElementById('2').className = `hidden`;
        document.getElementById('1').className = `bg-gradient-to-r from-cyan-600 to-sky-800 font-semibold text-white w-max shadow-lg mx-auto h-max my-auto sm:rounded-lg sm:p-6`;
        document.getElementById('section1').className = `w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full`
        document.getElementById('section1').innerHTML = `<span className="text-gray-800">01</span>`
        document.getElementById('section_2').className = `absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto`

    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [addProduct, AddNow] = useState({
        name: '',
        shipping: '',
        category: '',
        ship_cost: '',
        details: '',
        ship_time: '',
        cost: '',
        size: '',
        qty: '',
        Color: '',
        brand: '',
        // meta: '',
        // meta_key: '',
        // meta_details: '',
        // featured: '',
        // popular: '',
        // status: '',
        error_list: [],
    });
    const [imageNew, setImg] = useState({
        pic: '',
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

    const handleInput = (e) => {
        e.persist();
        AddNow({ ...addProduct, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setImg({ pic: e.target.files[0] });
    }

    const UpdateCategory = (e) => {
        e.preventDefault();
        document.getElementById('section2').className = `bg-amber-600 w-10 h-10 flex items-center justify-center rounded-full`
        document.getElementById('section2').innerHTML = `<svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`

        const formData = new FormData();
        formData.append('name', addProduct.name);
        formData.append('shipping', addProduct.shipping);
        formData.append('category', addProduct.category);
        formData.append('ship_cost', addProduct.ship_cost);
        formData.append('details', addProduct.details);
        formData.append('ship_time', addProduct.ship_time);
        formData.append('cost', addProduct.cost);
        formData.append('size', addProduct.size);
        formData.append('qty', addProduct.qty);
        formData.append('color', addProduct.color);
        formData.append('brand', addProduct.brand);
        formData.append('pic', imageNew.pic);

        axios.post(`api/Update-Product/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                });
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

    const [list, setCategoryList] = useState([]);
    var Category_HTML =
        list.map((info) => {
            return (
                <option key={info.id} value={info.id} >{info.name}</option>
            )
        });

    useEffect(() => {
        axios.get(`api/Category`).then(res => {
            if (res.status === 200) {

                setCategoryList(res.data.category);
            }
        });

        axios.get(`/api/Product/Edit-Product/${id}`).then(res => {
            if (res.data.status === 200) {
                AddNow(res.data.product);
                setImg(res.data.product);
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
        return <>Getting Ready to Edit Product..................</>
    }

    return (
        <>
            <div className="block w-full">

                <div className="w-full">
                    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-800 to-cyan-600" aria-label="Progress">
                        <ol role="list" className="rounded-md overflow-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none">
                            <li className="relative overflow-hidden lg:flex-1">
                                <div className="border border-gray-200 overflow-hidden border-b-0 rounded-t-md lg:border-0">
                                    {/* <!-- Completed Step --> */}
                                    <a href="#" className="group">
                                        <span id="section_1" className="absolute top-0 left-0 w-1 h-full bg-amber-500 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto" aria-hidden="true"></span>
                                        <span className="px-6 py-5 flex items-start text-sm font-medium">
                                            <span className="flex-shrink-0">
                                                <span id="section1" className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                                                    {/* <!-- Heroicon name: solid/check --> */}
                                                    <span className="text-gray-800">01</span>
                                                </span>
                                            </span>
                                            <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                                                <span className="text-xs font-semibold tracking-wide uppercase">Product Details</span>
                                                <span className="text-sm font-medium text-white">Vitae sed mi luctus laoreet.</span>
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </li>

                            <li className="relative overflow-hidden lg:flex-1">
                                <div className="border border-gray-200 overflow-hidden lg:border-0">
                                    {/* <!-- Current Step --> */}
                                    <a href="#" aria-current="step">
                                        <span id="section_2" className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto" aria-hidden="true"></span>
                                        <span className="px-6 py-5 flex items-start text-sm font-medium lg:pl-9">
                                            <span className="flex-shrink-0">
                                                <span id="section2" className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                                                    <span className="text-gray-800">02</span>
                                                </span>
                                            </span>
                                            <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                                                <span className="text-xs font-semibold tracking-wide uppercase">Product Description</span>
                                                <span className="text-sm font-medium text-white">Cursus semper viverra.</span>
                                            </span>
                                        </span>
                                    </a>

                                    {/* <!-- Separator --> */}
                                    <div className="hidden absolute top-0 left-0 w-3 inset-0 lg:block" aria-hidden="true">
                                        <svg className="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                                            <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke" />
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="mt-6 mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center">
                        <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className=" animate-bounce block mb-6">Update Your Product</span>
                        </h1>
                    </div>
                </div>

                <form id='product_form' encType='multipart/form-data'>
                    <div id="1" className="bg-gradient-to-r from-cyan-600 to-sky-800 w-max shadow-lg bg-opacity-75 mx-auto h-max my-auto sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-2 md:gap-3">
                            <div className="mb-3 xl:w-96">
                                <label htmlfor="name" className="form-label inline-block mb-2 text-gray-700"
                                >Product Name</label>
                                <input name="name" onChange={handleInput} id="name" placeholder={addProduct.name} type="text"
                                    className=" form-control block w-full px-2 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                />
                            </div>
                            <div className="mb-3 xl:w-96">
                                <label htmlfor="shipping" className="form-label inline-block mb-2 text-gray-700"
                                >Shipping Method</label>
                                <select onChange={handleInput} placeholder={addProduct.shipping} name="shipping" id="shipping" className=" form-control block w-full px-2 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                    <option >Select Method</option>
                                    <option value="Post">Post</option>
                                    <option value="Knutsford">Knutsford</option>
                                    <option value="ZipMail">ZipMail</option>
                                    <option value="Pickup">Pickup</option>
                                </select>
                            </div>
                            <div className="mb-3 xl:w-96">
                                <label htmlfor="category" className="form-label inline-block mb-2 text-gray-700"
                                >Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    placeholder={addProduct.category}
                                    onChange={handleInput}
                                    className=" form-control block w-full px-2 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                >
                                    <option >Select Category</option>
                                    {Category_HTML}
                                </select>
                            </div>
                            <div className="mb-3 xl:w-96">
                                <label htmlfor="name" className="form-label inline-block mb-2 text-gray-700"
                                >Shipping Cost</label>
                                <input name="ship_cost" onChange={handleInput} id="ship_cost" placeholder={addProduct.ship_cost} type="text"
                                    className=" form-control block w-full px-2 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-center">
                                <div className="mb-3 xl:w-96">
                                    <label htmlfor="details" className="form-label inline-block mb-2 text-gray-700"
                                    >Product Details</label>
                                    <textarea
                                        className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="details"
                                        name="details"
                                        rows="3"
                                        onChange={handleInput}
                                        placeholder={addProduct.details}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mb-3 xl:w-96">
                                <label htmlfor="ship_time" className="form-label inline-block mb-2 text-gray-700"
                                >Shipping Time</label>
                                <select onChange={handleInput} placeholder={addProduct.ship_time} name="ship_time" id="ship_time" className=" form-control block w-full px-2 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                    <option >Select Time</option>
                                    <option value="1">1 To 3 Days</option>
                                    <option value="2">3 To 5 Days</option>
                                    <option value="3">1 Week</option>
                                    <option value="4">2 Weeks</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex mt-6 justify-end">
                            <button
                                onClick={Next}
                                type="button"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>

                    <div id="2" className="bg-gradient-to-r from-cyan-600 to-sky-800 w-max overflow-x-hidden hidden bg-opacity-75 shadow-lg mx-auto h-max my-auto sm:rounded-lg sm:p-6">
                        <div className="">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlfor="cost" className="form-label inline-block mb-2 text-gray-700"
                                    >Product Cost</label>
                                    <input
                                        className="text-base font-normal text-gray-700 bg-white w-full px-3 py-1 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="cost"
                                        placeholder={addProduct.cost}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlfor="size" className="form-label inline-block mb-2 text-gray-700"
                                    >Product Size</label>
                                    <input
                                        className="text-base font-normal text-gray-700 bg-white w-full px-3 py-1 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="size"
                                        placeholder={addProduct.size}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlfor="brand" className="form-label inline-block mb-2 text-gray-700"
                                    >Product Amount</label>
                                    <input
                                        className="text-base font-normal text-gray-700 bg-white w-full px-3 py-1 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="qty"
                                        placeholder={addProduct.qty}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlfor="color" className="form-label inline-block mb-2 text-gray-700"
                                    >Product Color</label>
                                    <input
                                        className="text-base font-normal text-gray-700 bg-white w-full px-3 py-1 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="color"
                                        placeholder={addProduct.color}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className="">
                                    <label htmlfor="img" className="form-label inline-block mb-2 text-gray-700"
                                    >Product Image</label>
                                    <input
                                        onChange={handleImage}
                                        type="file"
                                        placeholder={imageNew.name}
                                        multiple accept="image/*"
                                        name="pic"
                                        id="pic"
                                        className="shadow-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 outline-orange-600 p-4 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={Back}
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Go Back
                            </button>
                            <button
                            type="button"
                            onClick={UpdateCategory}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Update
                        </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
}

export default EditProduct;