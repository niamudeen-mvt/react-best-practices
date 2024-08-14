export default function Loader() {
    return (
        <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
            <div class="relative inline-flex">
                <div class="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div class="w-6 h-6 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                <div class="w-6 h-6 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
        </div>
    );
}
