import React from "react";

const SendMessageAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-dark px-12 py-8 
    rounded-lg shadow-lg z-50 flex items-center space-x-6">
      <img
        src="/images/Check_circle_green.png"
        alt="Check"
        className="h-10 w-10"
      />
      <span className="text-[14px] ml-2 font-medium">{message}</span>
    </div>
  );
};

export default SendMessageAlert;
