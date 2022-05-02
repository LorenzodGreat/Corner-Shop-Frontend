

export default function Card() {
    return (<>
        <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-gradient-to-r from-red-600 to-amber-600 bg-opacity-75 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0"><svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3">
                            </path>
                        </svg></div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-lg font-medium text-white truncate">Total Purchase</dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">0</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                    <div class="text-sm"><a href="/Seller/Products" class="font-medium text-cyan-700 hover:text-cyan-900"> View
                        all </a></div>
                </div>
            </div>
            <div class="bg-gradient-to-r from-red-600 to-amber-600 bg-opacity-75 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0"><svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3">
                            </path>
                        </svg></div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-lg font-medium text-white truncate">Delivered Products</dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">0</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                    <div class="text-sm"><a href="#" class="font-medium text-cyan-700 hover:text-cyan-900"> View all </a></div>
                </div>
            </div>
            <div class="bg-gradient-to-r from-red-600 to-amber-600 bg-opacity-75 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0"><svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3">
                            </path>
                        </svg></div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-lg font-medium text-white truncate">Expected Products</dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">0</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                    <div class="text-sm"><a href="/Seller/Products/Deleted"
                        class="font-medium text-cyan-700 hover:text-cyan-900"> View all </a></div>
                </div>
            </div>
        </div>

    </>);
}