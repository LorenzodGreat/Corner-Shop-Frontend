import Card from "../../../components/frontend/user/Cards";

export default function UserDashboard() {
    return ( <>
    <div className="-mt-20">
    <Card/>
    </div>
    <main class="my-6 mx-auto max-w-7xl px-4 sm:my-6">
        <div class="text-center">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Your CornerShop </span>
            {/* <!-- space --> */}
            <span class="block text-indigo-600 xl:inline">Dashboard</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
        </div>
      </main>
    </> );
}