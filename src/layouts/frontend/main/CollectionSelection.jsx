
import axios from 'axios'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import MainNav from '../components/Nav';
import Foot from '../components/Footer';



export default function ItemView() {
    const [loading, setLoading] = useState(true)
    const [count, setProduct] = useState([])
    const [qty, SetQuantity] = useState(1)
    const [categorystate, setCategory] = useState([])
    const { category, product } = useParams();
    const productCnt = count.length;
    var Product_HTML = " ";

    // Quantity Count Button
    const HandledIncrement = () => {
        if (count.qty < 1) {
            SetQuantity(prevCount => prevCount + 1)
        }

    }
    const HandledDecrement = () => {
        if (count.qty > 1) {

            SetQuantity(prevCount => prevCount - 1)
        }
    }

    const ProductId = count.id;
    ////Add to Cart Requirements
    const AddToCart = (e) => {
        e.preventDefault();
        const data = {
            product_id: ProductId,
            product_qty: qty,
        }
        // console.log(ProductId);

        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                })
            } else if (res.data.status === 401) {
                Toast2.fire({
                    icon: 'error',
                    title: res.data.message
                })

            }
        })

    }

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



    // Api Fetching Data
    useEffect(() => {
        let Mounted = true;
        axios.get(`/api/collections/${category}/${product}`).then(res => {
            if (Mounted) {

                if (res.data.status === 200) {
                    setProduct(res.data.product);
                    setCategory(res.data.category);
                } else if (res.data.status === 404) {
                }
            }
            setLoading(false);

        })
    }, [category, product]);

    if (loading) {
        return <>Loading Product..................</>
    }
    if (productCnt) {
        var Product_HTML =
            count.map((product) => {
                return (
                    <section key={product.id} class="text-gray-600 body-font overflow-hidden">
                        <div class="container px-5 py-24 mx-auto">
                            <div class="lg:w-4/5 mx-auto flex flex-wrap">
                                <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                    <h2 class="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
                                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{product.name}</h1>
                                    <div class="flex mb-4">
                                        <a class="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
                                    </div>
                                    <p class="leading-relaxed mb-4">{product.details}</p>
                                    <div class="flex border-t border-gray-200 py-2">
                                        <span class="text-gray-500">Color</span>
                                        <span class="ml-auto text-gray-900">{product.color}</span>
                                    </div>
                                    <div class="flex border-t border-gray-200 py-2">
                                        <span class="text-gray-500">Size</span>
                                        <span class="ml-auto text-gray-900">{product.size}</span>
                                    </div>

                                    {product.qty > 0 ?
                                        <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                                            <span class="text-gray-500">Quantity</span>
                                            <span class="ml-6 font-semibold text-red-500">{product.qty}</span>
                                            <div class="ml-auto  flex max">
                                                <button onClick={HandledDecrement} className='p-3 rounded-l-xl  bg-cyan-800 font-bold border-0 text-white hover:bg-green-600' >-</button>
                                                <input className='p-3 w-12' type="text" value={qty} name="qty" id="qty" />
                                                <button onClick={HandledIncrement} className='p-3 bg-cyan-800 rounded-r-xl font-bold border-0 text-white hover:bg-green-600' >+</button>
                                            </div>
                                        </div>
                                        : <h1>Not in Stock</h1>}

                                    <div class="flex">
                                        <span class="title-font font-medium text-2xl text-gray-900">${product.cost}.00</span>
                                        <button type='button' onClick={AddToCart} class="flex ml-auto text-white bg-cyan-800 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Add to cart</button>
                                        <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={`http://127.0.0.1:8000/${product.pic}`} />
                            </div>
                        </div>
                    </section>
                )
            });
    }
    else {
        var Product_HTML = "No Data Yet "
    }
    return (
        <>
            <MainNav />
            {Product_HTML}
            <Foot />

        </>
    )
}
