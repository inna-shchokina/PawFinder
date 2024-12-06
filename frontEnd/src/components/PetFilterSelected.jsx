import React from "react";

const PetFilterSelected = ({ filters, optionsMap, onRemoveFilter }) => {
    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(filters).map((filterName) =>
          filters[filterName].map((filterValue) => {
            if (filterValue === "all") return null;
  
            const option = optionsMap[filterName]?.find(
              (opt) => opt.value === filterValue
            );
  
            return (
              <div
                key={`${filterName}-${filterValue}`}
                className="bg-[#E2E9B7] text-[#505865] px-4 py-2 rounded-full 
                flex items-center gap-2 mb-6"
              >
                <span>{option?.label}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onRemoveFilter(filterName, filterValue)}
                >
                  &#10005;
                </button>
              </div>
            );
          })
        )}
      </div>
    );
  };

export default PetFilterSelected;
