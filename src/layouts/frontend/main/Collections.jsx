import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Foot from '../components/Footer';
import MainNav from "../components/Nav";
export default function CategoryPage() {
    const [list, setCategoryList] = useState([]);

    useEffect(() => {

        axios.get(`api/getcollections`).then(res => {
            if (res.status === 200) {

                setCategoryList(res.data.category);
            }
        });
        
        console.log(list)

    }, []);

    // var {par} = useParams();
    var Category_HTML =
        list.map((info) => {
            return (
                <li key={info.id} class="relative">
                <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                  <img  src={`http://127.0.0.1:8000/${info.img}`} alt="" class="object-cover pointer-events-none group-hover:opacity-75"/>
                  <Link to={`${info.name}`} type="button" class="absolute inset-0 focus:outline-none">
                    <span class="sr-only">View details for {info.name}</span>
                  </Link>
                </div>
                <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{info.name}</p>
              </li>
            )
        });

return(
    <>
    <MainNav/>
<main className="w-full p-6">

    <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
{Category_HTML}
</ul>
</main>
<Foot />

    </>
)
}
