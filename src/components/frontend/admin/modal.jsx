import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export default function AddModal() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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

    const [addCategory, AddNow] = useState({
        name: '',
        error_list: [],
    });


    const handle = (e) => {
        e.persist();
        AddNow({ ...addCategory, [e.target.name]: e.target.value })
    }

    const [imageNew, setImg] = useState({
        img: '',
        error_list: [],
    });

    const handleImage = (e) => {
        setImg({ img: e.target.files[0] });
    }

    const navigate = useNavigate();

    const NewCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', addCategory.name);
        formData.append('img', imageNew.img);

        axios.post(`api/Store-Category`, formData).then(res => {
            if (res.data.status === 200) {
                Toast2.fire({
                    icon: 'success',
                    title: res.data.message
                })
                document.getElementById('cat_form').reset();
                setIsOpen(false);
                navigate('/Admin/Category');
            } else if (res.data.status === 422) {
                Toast2.fire({
                    icon: 'warnig',
                    title: 'Please Input Correct Data'
                })
            }
        });
    }

    return (
        <>
            <div className="">
                <button
                    type="button"
                    onClick={openModal}
                    className="focus:outline-none rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    New Category
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2">
                                        <form onSubmit={NewCategory} encType='multipart/form-data' id='cat_form'>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Category
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    onChange={handle}
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 outline-orange-600 p-4 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="Category Name"
                                                />
                                                <span className='text-red-500'>{addCategory.error_list.name}</span>
                                            </div>

                                            <label htmlFor="name" className="block mt-6 text-sm font-medium text-gray-700">
                                                Category Photo
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    onChange={handleImage}
                                                    type="file"
                                                    multiple accept="image/*"
                                                    name="img"
                                                    id="img"
                                                    className="shadow-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 outline-orange-600 p-4 block w-full sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>


                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="focus:outline-none text-white ml-4 inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium  hover:bg-green-900 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
