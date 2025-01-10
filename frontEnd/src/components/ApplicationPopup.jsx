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
      rounded-[5rem] shadow-sm max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-12 right-14 text-dark text-[16px] font-bold rounded-full p-2 
          transition hover:bg-gray-200"
        >
          ✕
        </button>

        <h2 className="text-[24px] font-bold mt-8 mb-4">Adoption Form</h2>
        <p className="text-[15px] text-dark mb-24">
          Leave your information and we will contact you
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full items-center"
        >
          {/* Name Input */}
        <div className="w-full max-w-[400px]">
          <label
            htmlFor="name"
            className="ml-4 block text-dark font-bold text-[14px] mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-6 h-[46px]"
          />
        </div>

         {/* Email Input */}
        <div className="w-full max-w-[400px]">
          <label
            htmlFor="email"
            className="ml-4 block text-dark font-bold text-[14px] mb-2"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-6 h-[46px]"
          />
        </div>

          {/* Message Textarea */}
        <div className="w-full max-w-[400px]">
          <label
            htmlFor="message"
            className="ml-4 block text-dark font-bold text-[14px] mb-2"
          >
            Leave a message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Leave a message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-[24px] focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-10 h-[150px]"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-dark text-white text-[14px] w-[200px] py-4 font-medium rounded-full 
    hover:bg-[#8D9F19] transition"
          >
            Send application
          </button>
          </div>
        </form>
      </div>
      <ToastContainer className="text-[1.4rem w-[30%]" />
    </div>
  );
}

export default ApplicationPopup;
