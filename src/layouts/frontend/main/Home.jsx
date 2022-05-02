
import { Fragment, useEffect, useState } from 'react'
// import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
// import { MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import MainNav from '../components/Nav'
import Foot from '../components/Footer'
import NavAuth from '../components/NavAuth'
import axios from 'axios'

const perks = [
    {
        name: 'Returns',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
        description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
    },
    {
        name: 'Same day delivery',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
        description:
            'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
        name: 'All year discount',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
        description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
    {
        name: 'For the planet',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
        description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
    },
]

const stuffData = [
    {
        name: 'Electronics Accessories',
        imageUrl: 'https://img.freepik.com/free-photo/gamer-workspace_127657-18683.jpg?size=626&ext=jpg&ga=GA1.2.1028886266.1630780142',
        description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
    },
    {
        name: 'Phones',
        imageUrl: 'https://img.freepik.com/free-psd/youtube-mobile-phone-mockup_106244-1675.jpg?t=st=1651449933~exp=1651450533~hmac=196752cdda2207fbc3e19d303ded716638876e45a85f2ad6d9b2b5244acd1148&w=740',
        description:
            'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
        name: 'Computers',
        imageUrl: 'https://img.freepik.com/free-photo/laptop-wooden-table_53876-20635.jpg?t=st=1651450012~exp=1651450612~hmac=38962250347228665531fba6abc885578ce5d3b02d7e223e3ded06e9cce4218e&w=740',
        description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Home() {
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(1)
    const [per, setPerPage] = useState(4)
    const [post, setCategory] = useState([])

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

    useEffect(() => {

        axios.get(`api/Category`).then(res => {
            if (res.status === 200) {

                setCategory(res.data.category);
            }
        });

    }, []);

const LastPost = current * per;
const FirstPost = LastPost - per;
const CurrentPost = post.slice(FirstPost, LastPost);


    return (
        <div >
            {Auth}
            <main>
                {/* Hero section */}
                <div className="relative">
                    {/* Background image and overlap */}
                    <div  className=" absolute inset-0 sm:flex sm:flex-col">
                        <div className="flex-1 relative w-full bg-gray-800">
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                                    alt=""
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gray-900 opacity-50" />
                        </div>
                        <div className="w-full bg-white h-32 md:h-40 lg:h-48" />
                    </div>

                    <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
                        {/* Background image and overlap */}
                        <div  className="absolute inset-0 flex flex-col sm:hidden">
                            <div className="flex-1 relative w-full bg-gray-800">
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                                        alt=""
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gray-900 opacity-50" />
                            </div>
                            <div className="w-full bg-white h-48" />
                        </div>
                        <div className="relative py-32">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                                Shop Cornershop Electronics 
                            </h1>
                            <div className="mt-4 sm:mt-6">
                                <a
                                    href="/collections"
                                    className="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
                                >
                                    Shop Collection
                                </a>
                            </div>
                        </div>
                    </div>

                    <section aria-labelledby="collection-heading" className="-mt-96 relative sm:mt-0">
                        <h2 id="collection-heading" className="sr-only">
                            Collections
                        </h2>
                        <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
                            {stuffData.map((collection) => (
                                <div
                                    key={collection.name}
                                    className="group relative h-96 bg-white rounded-lg shadow-xl"
                                >
                                    <div>
                                        <div  className="absolute inset-0 rounded-lg overflow-hidden">
                                            <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                                <img
                                                    src={collection.imageUrl}
                                                    alt={collection.imageAlt}
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                                        </div>
                                        <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                                            <div>
                                                <p aria-hidden="true" className="text-sm text-white">
                                                    Shop the collection
                                                </p>
                                                <h3 className="mt-1 font-semibold text-white">
                                                    <a href={collection.href}>
                                                        <span className="absolute inset-0" />
                                                        {collection.name}
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section aria-labelledby="trending-heading">
                    <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between">
                            <h2 id="favorites-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                                Trending Category
                            </h2>
                            <a href="/collections" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                                Shop the collection<span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                            {CurrentPost.map((product) => (
                                <div key={product.id} className="group relative">
                                    <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                                        <a href={product.href}>
                                        <img
                                        src={`http://127.0.0.1:8000/${product.img}`}
                                            alt={product.imageAlt}
                                            className="w-full h-full object-center object-cover"
                                        />
                                        </a>
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">
                                            <span className="absolute inset-0" />
                                            {product.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-sm md:hidden">
                            <a href="/collections" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Shop the collection<span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="perks-heading" className="bg-gray-50 border-t border-gray-200">
                    <h2 id="perks-heading" className="sr-only">
                        Our perks
                    </h2>

                    <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
                        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                            {perks.map((perk) => (
                                <div
                                    key={perk.name}
                                    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                                >
                                    <div className="md:flex-shrink-0">
                                        <div className="flow-root">
                                            <img className="-my-1 h-24 w-auto mx-auto" src={perk.imageUrl} alt="" />
                                        </div>
                                    </div>
                                    <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                                        <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">{perk.name}</h3>
                                        <p className="mt-3 text-sm text-gray-500">{perk.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Foot />

        </div>
    )
}
