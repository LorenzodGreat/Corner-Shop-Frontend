import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Card from "../../../components/frontend/user/Cards";


export default function UserProfile() {
  const toke_data = {
    auth_name: localStorage.getItem('auth_name'),
    auth_email: localStorage.getItem('auth_email'),
    auth_phone: localStorage.getItem('auth_phone'),
}

    return (<>
 <article>
  <div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <div class="flex">
          <img
            class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=1024&amp;h=1024&amp;q=80"
            alt=""
          />
        </div>
        <div
          class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
        >
          <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
            <h1 class="text-2xl font-bold text-gray-900 truncate">
             {toke_data.auth_name}
            </h1>
          </div>
          <div
            class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <button
              type="button"
              class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
                <PencilIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400"/>
              <span>Edit Details</span></button
            ><button
              type="button"
              class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
                <TrashIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400"/>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
        <h1 class="text-2xl font-bold text-gray-900 truncate">
        {toke_data.auth_name}
        </h1>
      </div>
    </div>
  </div>
  <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Email</dt>
        <dd class="mt-1 text-sm text-gray-900">{toke_data.auth_email}</dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Phone</dt>
        <dd class="mt-1 text-sm text-gray-900">{toke_data.auth_phone}</dd>
      </div>
    </dl>
  </div>
</article>

    </>);
}