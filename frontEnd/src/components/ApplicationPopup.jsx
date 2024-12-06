import { useState } from "react";
import { useUserAuth } from "../contexts/UserAuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ApplicationPopup({ pet, onClose }) {
  const { user, isAuthenticated } = useUserAuth();
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !user?.userId) {
      toast.warn("Please log in to send an application.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${
          user.userId
        }/adoption-applications`,
        { petId: pet._id },
        { withCredentials: true }
      );
      toast.success(`Your application for ${pet.name} was sent successfully!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
      <div
        className="relative bg-light w-[80%] md:w-[40%] my-[5rem] mx-auto p-[4rem] flex flex-col items-center 
      rounded-[5rem] shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-12 right-14 text-dark text-[16px] font-bold rounded-full p-2 
          transition hover:bg-gray-200"
        >
          ✕
        </button>

        <h2 className="text-[3rem] font-bold mb-4">Adoption Form</h2>
        <p className="text-[14px] text-dark mb-16">
          Leave your information and we will contact you
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full items-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border-b-2 border-dark text-[16px] text-dark bg-transparent border-dashed 
            py-[1rem] max-w-[400px] min-w-[300px] focus:outline-none focus:border-red mb-6"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border-b-2 border-dark text-[16px] text-dark bg-transparent border-dashed 
            py-[1rem] max-w-[400px] min-w-[300px] focus:outline-none focus:border-red mb-14"
          />
          <textarea
            name="message"
            placeholder="Leave a message"
            value={formData.message}
            onChange={handleChange}
            className="border-2 border-dark text-[16px] text-[#505865] bg-transparent border-dashed px-4 py-4
            h-[150px] mb-10 max-w-[400px] min-w-[300px] rounded-3xl focus:outline-none focus:border-red"
          />
          <button
            type="submit"
            className="text-white bg-red text-[14px] w-full max-w-[200px] py-3 font-medium rounded-full 
            transition hover:bg-dark mb-8"
          >
            Send application
          </button>
        </form>
      </div>
      <ToastContainer className="text-[1.4rem w-[30%]" />
    </div>
  );
}

export default ApplicationPopup;
