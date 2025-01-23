import { toast } from 'react-toastify';

export const ToastMessage = (message) => {
    toast(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
}