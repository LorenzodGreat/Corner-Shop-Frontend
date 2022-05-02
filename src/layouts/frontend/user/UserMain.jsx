import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    BellIcon,
    CashIcon,
    ClockIcon,
    MenuIcon,
    ReceiptRefundIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';

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
const navigation = [
    { name: 'Home', href: '/User/Dashboard', current: true },
    { name: 'Profile', href: '/User/Profile', current: false },
    { name: 'Orders', href: '/User/Orders', current: false },
    { name: 'Settings', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '/User/Profile' },
    { name: 'Settings', href: '#' },
]

const stats = [
    { label: 'Vacation days left', value: 12 },
    { label: 'Sick days left', value: 4 },
    { label: 'Personal days left', value: 2 },
]
const actions = [
    {
        icon: ClockIcon,
        name: 'Request time off',
        href: '#',
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        icon: BadgeCheckIcon,
        name: 'Benefits',
        href: '#',
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
    },
    {
        icon: UsersIcon,
        name: 'Schedule a one-on-one',
        href: '#',
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
    },
    { icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
    {
        icon: ReceiptRefundIcon,
        name: 'Submit an expense',
        href: '#',
        iconForeground: 'text-rose-700',
        iconBackground: 'bg-rose-50',
    },
    {
        icon: AcademicCapIcon,
        name: 'Training',
        href: '#',
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
    },
]
const recentHires = [
    {
        name: 'Leonard Krasner',
        handle: 'leonardkrasner',
        imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Floyd Miles',
        handle: 'floydmiles',
        imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Emily Selman',
        handle: 'emilyselman',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Kristin Watson',
        handle: 'kristinwatson',
        imageUrl:
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
]
const announcements = [
    {
        id: 1,
        title: 'Office closed on July 2nd',
        href: '#',
        preview:
            'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
    },
    {
        id: 2,
        title: 'New password policy',
        href: '#',
        preview:
            'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
    },
    {
        id: 3,
        title: 'Office closed on July 2nd',
        href: '#',
        preview:
            'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MainUser() {
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
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <Popover as="header" className="pb-24 bg-gradient-to-r from-sky-800 to-cyan-600">
                    {({ open }) => (
                        <>
                            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                                    {/* Logo */}
                                    <div className="absolute inline font-semibold text-2xl text-gray-50 left-0 py-5 flex-shrink-0 lg:static">
                                        <a className='flex' href="/">
                                            {/* https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg */}
                                            <svg className="h-8 w-auto mr-2" fill="none" viewBox="0 0 35 32" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill="#A5F3FC"
                                                    d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
                                                />
                                            </svg>
                                            CornershopJa
                                        </a>
                                    </div>

                                    {/* Right section on desktop */}
                                    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                                        <button
                                            type="button"
                                            className="flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
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
                                    </div>

                                    <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                                        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                                            {/* Left nav */}
                                            <div className="hidden lg:block lg:col-span-2">
                                                <nav className="flex space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current ? 'text-white' : 'text-cyan-100',
                                                                'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </nav>
                                            </div>
                                            <div className="px-12 lg:px-0">
                                                {/* Search */}
                                                <div className="max-w-xs mx-auto w-full lg:max-w-md">
                                                    <label htmlFor="search" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative text-white focus-within:text-gray-600">
                                                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                        </div>
                                                        <input
                                                            id="search"
                                                            className="block w-full text-white bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                            placeholder="Search"
                                                            type="search"
                                                            name="search"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu button */}
                                    <div className="absolute right-0 flex-shrink-0 lg:hidden">
                                        {/* Mobile menu button */}
                                        <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>

                            <Transition.Root as={Fragment}>
                                <div className="lg:hidden">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="duration-150 ease-in"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                                    </Transition.Child>

                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="duration-150 ease-in"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Popover.Panel
                                            focus
                                            className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                                        >
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                                                <div className="pt-3 pb-2">
                                                    <div className="flex items-center justify-between px-4">
                                                        <div>
                                                            <img
                                                                className="h-8 w-auto"
                                                                src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                                                                alt="Workflow"
                                                            />
                                                            <h1>CornerShop</h1>
                                                        </div>
                                                        <div className="-mr-2">
                                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                                                <span className="sr-only">Close menu</span>
                                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                                            </Popover.Button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 px-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                            >
                                                                {item.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pt-4 pb-2">
                                                    <div className="flex items-center px-5">
                                                        <div className="flex-shrink-0">
                                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                                        </div>
                                                        <div className="ml-3 min-w-0 flex-1">
                                                            <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                                                            <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                                        >
                                                            <span className="sr-only">View notifications</span>
                                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                    <div className="mt-3 px-2 space-y-1">
                                                        {userNavigation.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                            >
                                                                {item.name}
                                                            </a>
                                                        ))}
                                                        <button onClick={Logout}
                                                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                        >Sign Out
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition.Child>
                                </div>
                            </Transition.Root>
                        </>
                    )}
                </Popover>

                <main className='p-2'>

                    <Outlet />
                </main>
                <footer>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                        <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
                            <span className="block sm:inline">&copy; 2022 Amber Heart Coding Academy.</span>{' '}
                            <span className="block sm:inline">All rights reserved.</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}