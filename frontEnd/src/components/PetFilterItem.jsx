import React from "react";
import Select from "react-select";

const PetFilterItem = ({ options, placeholder, onChange }) => {
  return (
    <Select
      isMulti
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={null}
      closeMenuOnSelect={true} 
      isSearchable={false} 
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderRadius: "30px",
          padding: "5px",
          backgroundColor: "#E7E7D6",
          fontSize: "14px",
          fontWeight: "300",
          borderColor: state.isFocused ? "#809309" : "#071327",
          boxShadow: state.isFocused ? `0 0 0 1px #809309` : "none",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
    backgroundColor: "none",
},
        }),
        input: (provided) => ({
          ...provided,
          caretColor: "transparent", // Remove the text cursor
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#071327", // text in placeholder
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: "#071327",
        }),
        menu: (provided) => ({
          ...provided,
          padding: "0 10px",
          borderRadius: "20px",
          backgroundColor: "#E7E7D6",
          border: "1px solid #071327",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }),
        option: (provided, state) => ({
          ...provided,
          borderRadius: "30px",
          backgroundColor: state.isSelected
            ? "#FAFAF5"
            : state.isFocused
            ? "#FAFAF5"
            : "#E7E7D6",
          color: state.isSelected ? "#FFFFFF" : "#071327",
          fontSize: "14px",
          padding: "10px 16px",
          margin: "10px 0",
          boxSizing: "border-box",
          "&:hover": {
            backgroundColor: "#FAFAF5",
            color: "#071327",
          },
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#809309",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "#809309",
          "&:hover": {
            color: "#FAFAF5",
            backgroundColor: "#FAFAF5",
          },
        }),
      }}
    />
  );
};

export default PetFilterItem;
