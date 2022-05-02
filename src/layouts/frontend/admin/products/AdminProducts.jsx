import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ProductModal from "../../../../components/frontend/admin/modal2";

export default function AdminProducts() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [list, setProductList] = useState([]);
    let total = list.length;
    var Product_HTML = '';

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

    const deleteProducts = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.post(`api/Delete-Product/${id}`).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                });
                navigate('/Admin/Products');

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

    const restoreProduct = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Restoring";

        axios.post(`api/Restore/Product/${id}`).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                })
                navigate('/Admin/Products');
                // thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                Toast2.fire({
                    icon: 'warnig',
                    title: res.data.message,
                })
                thisClicked.innerText = "Restore";
            }
        })

    }

    useEffect(() => {

        axios.get(`api/Product`).then(res => {
            if (res.status === 200) {

                setProductList(res.data.product);
            }
            setLoading(false);
        });

    }, []);
    if (loading) {
        return <>Loading Product..................</>
    }
    else {

        var Product_HTML =
            list.map((product) => {
                return (
                    <div key={product.id} class="py-6 sm:flex">
                        <div
                            class="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8"
                        >
                            <img
                                src={`http://127.0.0.1:8000/${product.pic}`}
                                alt="Olive green leather card-sized wallet with matching hand stitched and embossed logo on lower right."
                                class="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                            />
                            <div class="pt-1.5 min-w-0 flex-1 sm:pt-0">
                                <h3 class="text-sm font-medium text-gray-900">
                                    <a href="#">{product.name}</a>
                                </h3>
                                <p class="text-sm text-gray-500 truncate">
                                    <span>{product.category.name}
                                    </span>
                                    <span class="mx-1 text-gray-400" aria-hidden="true">·</span
                                    ><span>{product.color}</span>
                                </p>
                                {product.status == 0 ?
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
                                <p class="mt-1 font-medium text-gray-900">${product.cost}.00</p>
                                <p class="text-sm text-gray-500 truncate">
                                    {product.details}

                                </p>
                            </div>
                        </div>
                        <div class="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                            <Link to={`Edit-Products/${product.id}`}
                                type="button"
                                class="w-full flex items-center justify-center bg-amber-500  py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                            >
                                Edit Item</Link>
                          
                            {product.status == 0 ?
                    <button
                    onClick={(e) => deleteProducts(e, product.id)}
                    type="button"
                    class="w-full flex items-center justify-center bg-red-500 py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                >
                    Delete
                </button>
                            :
                            <button
                            onClick={(e) => restoreProduct(e, product.id)}
                            type="button"
                            class="w-full flex items-center justify-center bg-red-500 py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                            >
                            Restore
                        </button>
                        }
                        </div>
                    </div>
                )
            });
    }

    return (<>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <main class="max-w-3xl mx-auto px-4 py-2 sm:px-6 sm:pt-14 sm:pb-12 lg:px-8">
                <div class="max-w-xl">
                    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
                        Your Products
                    </h1>
                    <p class="mt-2 text-sm text-gray-500">
                        Check the status of recent orders, manage returns, and discover similar
                        products.
                    </p>
                </div>
                <div class="mt-12 space-y-16 sm:mt-16">
                    <section aria-labelledby="4376-heading">
                        <div
                            class="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4"
                        >
                            <div
                                class="space-y-5 md:flex-1 md:min-w-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0"
                            >
                                <div class="flex text-sm font-medium">
                                    <ProductModal />
                                </div>
                            </div>
                        </div>

                        <div
                            class="mt-6 -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200"
                        >
                            {Product_HTML}
                        </div>

                    </section>
                </div>
            </main>
        </div>


    </>);
}