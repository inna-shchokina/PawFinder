import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function ShelterList({ shelters, handleClick, activeStateIndex }) {
  console.log(activeStateIndex);
  return (
    <div className="sheltersList flex flex-col w-[80%] md:w-[35%] gap-[3rem]">
      {shelters.map((shelter, i) => (
        <div
          key={shelter._id}
          className={`shelterInfo  text-dark flex flex-col gap-[3rem] w-full p-[5rem] rounded-[2rem] ${
            activeStateIndex === i ? "active" : ""
          }`}
          onClick={() => handleClick(shelter, i)}
        >
          <div>
            <h2 className="text-[1.8rem] lg:text-[2.3rem] mb-[1rem] font-bold">
              {shelter.companyName}
            </h2>
            <p className="flex items-baseline text-[1.4rem]">
              <span>
                <IoLocationOutline />
              </span>
              {shelter.address}
            </p>
          </div>
          <Link
            to={`/shelters/${shelter._id}`}
            className="text-[1.4rem] border w-[fit-content] py-[6px] px-[1.5rem] hover:bg-white hover:text-green rounded-[3rem] border-dark"
          >
            More details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ShelterList;
