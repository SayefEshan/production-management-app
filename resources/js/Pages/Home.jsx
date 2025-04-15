import { Head } from "@inertiajs/react";

function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Home Page Content
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
