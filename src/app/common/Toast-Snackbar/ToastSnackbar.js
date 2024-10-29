import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = (type, data, duration = 3000) => {
  return toast(data, {
    type: type,
    position: "top-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: 1,
  });
};
