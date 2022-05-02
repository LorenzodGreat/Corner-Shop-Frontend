import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Menu, Transition } from '@headlessui/react'
import { MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
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

const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    role: 'Human Resources Manager',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const userNavigation = [
    { name: 'Your Profile', href: '/User/Profile' },
    { name: 'Settings', href: '#' },
]

function NavAuth() {
    const navigate = useNavigate();

    const Logout = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_email');
                localStorage.removeItem('auth_phone');
                localStorage.removeItem('auth_role');
                navigate('/login');
                Toast.fire({
                    icon: 'success',
                    title: 'Logout Successfully'
                });
            }
        });
    }
    const [list, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false)
    var Category_HTML =
        list.map((info) => {
            return (
                <div class="relative flex" key={info.id}>
                    <Link to={`collections/${info.name}`} class="border-transparent text-gray-200 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px" id="headlessui-popover-Linkbutton-5" type="button" aria-expanded="false">{info.name}
                    </Link>
                </div>
            )
        });

        useEffect(() => {

            axios.get(`api/getcollections`).then(res => {
                if (res.status === 200) {
    
                    setCategoryList(res.data.category);
                }
            });
    
        }, []);
    return (<>
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                        <div className="px-4 pt-5 pb-2 flex">
                            <button
                                type="button"
                                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                onClick={() => setOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>



                        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                            {Category_HTML}
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                            <div className="flow-root">
                                <p  className="-m-2 p-2 block font-medium text-gray-900">
                                    Get the Best Electronics in the country.
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                            {/* Currency selector */}
                            <form>
                                <div className="inline-block">
                                    <label htmlFor="mobile-currency" className="sr-only">
                                        Currency
                                    </label>
                                    <div className="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                                        <select
                                            id="mobile-currency"
                                            name="currency"
                                            className="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
                                        >
                                            {currencies.map((currency) => (
                                                <option key={currency}>{currency}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                                className="w-5 h-5 text-gray-500"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M6 8l4 4 4-4"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>

        <header className="relative">
            <nav aria-label="Top">
                {/* Top navigation */}
                <div className="bg-gray-900">
                    <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
                        {/* Currency selector */}
                        <form>
                            <div>
                                <label htmlFor="desktop-currency" className="sr-only">
                                    Currency
                                </label>
                                <div className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                                    <select
                                        id="desktop-currency"
                                        name="currency"
                                        className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
                                    >
                                        {currencies.map((currency) => (
                                            <option key={currency}>{currency}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                            className="w-5 h-5 text-gray-300"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M6 8l4 4 4-4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="flex items-center space-x-6">
                            <p className="text-sm font-medium text-white hover:text-gray-100">
                                Let's get shopping
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secondary navigation */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-16 flex items-center justify-between">
                            {/* Logo (lg+) */}
                            <div className="hidden lg:flex-1 lg:flex lg:items-center">
                                <a href="/">
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </a>
                            </div>

                            <div className="hidden h-full lg:flex">
                                {/* Flyout menus */}
                                <Popover.Group className="px-4 bottom-0 inset-x-0">
                                    <div className="h-full flex justify-center space-x-8">

                                        {Category_HTML}
                                    </div>
                                </Popover.Group>
                            </div>

                            {/* Mobile menu and search (lg-) */}
                            <div className="flex-1 flex items-center lg:hidden">
                                <button
                                    type="button"
                                    className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                             
                            </div>

                            {/* Logo (lg-) */}
                            <a href="/" className="lg:hidden">
                                <span className="sr-only">Workflow</span>
                                <img
                                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                                    alt=""
                                    className="h-8 w-auto"
                                />
                            </a>

                            <div className="flex-1 flex items-center justify-end">
                               

                                <div className="flex items-center lg:ml-8">
                                <Menu as="div" className="ml-4 relative flex-shrink-0">
                                            <div>
                                                <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                    <button onClick={Logout}
                                                        className="block rounded-md px-3 py-2 text-sm text-gray-700"
                                                    >Sign Out
                                                    </button>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-8">
                                        <Link to={"/Cart"} className="group -m-2 p-2 flex items-center">
                                            <ShoppingBagIcon
                                                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </Link>
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

export default NavAuth;