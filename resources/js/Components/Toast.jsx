import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from "@inertiajs/react"; // Adjust the import according to your project setup

const Toast = () => {
    const { flash } = usePage().props;

    const showToastMessageSuccess = (message) => {
        toast.success(message, {
        });
    };

    const showToastMessageError = (message) => {
        toast.error(message, {
        });
    };

    useEffect(()=>{
        if (flash.success){
            showToastMessageSuccess(flash.success);
        } else if(flash.error){
            showToastMessageError(flash.error);
        }
        
    },[flash]);

    return <ToastContainer />;
};

export default Toast;
