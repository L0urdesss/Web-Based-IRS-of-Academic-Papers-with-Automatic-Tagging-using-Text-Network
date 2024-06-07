import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router,usePage } from '@inertiajs/react';
import PaperDetails from './Partials/PaperDetails';
import { useState, useEffect } from 'react';

export default function Preview({ auth, paper ,success , status}) {
    // const[clicked, setClicked] = useState(false);

    // const { urlPrev } = usePage().props;

    // const back = () => {
    //     if (urlPrev !== 'empty' && clicked) {
    //         console.log("going back")
    //         router.visit(urlPrev)
    //     }
    // };

    // useEffect(() => {
    //     if(clicked){
    //         back();
    //         setClicked(false)
    //     }
    // }, [clicked]);

    // const triggerBack = () => {
    //     setClicked(true);
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
        > 
            <Head title={'Paper'} /> {/* Removed paper.id from here */}



            <div className="py-10">
                {/* <button onclick={triggerBack()}>go back</button> */}

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PaperDetails paper={paper} user={auth.user} success={success} status = {status}></PaperDetails>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
