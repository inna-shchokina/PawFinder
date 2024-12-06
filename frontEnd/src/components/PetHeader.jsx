import React from "react";

function PetHeader({ toggleFilters, isFilterOpen, activeFilterCount }) {
  return (
    <div className="max-w-[120rem] mx-auto 2xl:px-24 flex justify-between items-center mb-6">
      <h1 className="text-left text-[3.5rem] font-black mt-10 mb-10">
        WHICH ONE IS YOUR BEST FRIEND?
      </h1>
      <div className="flex items-center gap-4">
        <p className="text-[16px] font-normal text-dark">Filter</p>
        <div
          className={`relative w-14 h-14 flex items-center justify-center rounded-full border border-dark group
            ${
              isFilterOpen ? "bg-dark" : "hover:bg-dark"
            } transition cursor-pointer`}
          onClick={toggleFilters}
        >
          <img
            src="/images/filter.svg"
            alt="Filter"
            className={`w-10 h-10 transition ${
              isFilterOpen ? "invert" : "group-hover:invert"
            }`}
          />
          {activeFilterCount > 0 && (
            <div
              className="absolute top-[-8px] right-[-8px] bg-red w-8 h-8 rounded-full text-white 
              flex items-center justify-center text-[11px] font-medium"
            >
              {activeFilterCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PetHeader;
