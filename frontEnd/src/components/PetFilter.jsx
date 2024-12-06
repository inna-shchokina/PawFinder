import { useState } from "react";
import FilterSelect from "./PetFilterItem";
import SelectedFilters from "./PetFilterSelected";

const PetFilter = ({ onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? JSON.parse(savedFilters) : {
      location: [],
      age: [],
      size: [],
      petType: [],
      gender: [],
    };
  });

  const petTypeOptions = [
    { value: "all", label: "All" },
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
  ];

  const locationOptions = [
    { value: "all", label: "All" },
    { value: "Berlin", label: "Berlin" },
    { value: "Munich", label: "Munich" },
    { value: "Stuttgart", label: "Stuttgart" },
    { value: "Frankfurt", label: "Frankfurt" },
    { value: "Dresden", label: "Dresden"},
    { value: "Köln", label: "Köln"},
    { value: "Hamburg", label: "Hamburg"},
  ];

  const sizeOptions = [
    { value: "all", label: "All" },
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const genderOptions = [
    { value: "all", label: "All" },
    { value: "male", label: "Male" },
    { value: "male-neutered", label: "Male (Neutered)" },
    { value: "female", label: "Female" },
    { value: "female-neutered", label: "Female (Neutered)" },
  ];

  const ageOptions = [
    { value: "all", label: "All" },
    { value: "Junior", label: "Junior" },
    { value: "Adult", label: "Adult" },
    { value: "Senior", label: "Senior" },
  ];

  const optionsMap = {
    petType: petTypeOptions,
    location: locationOptions,
    size: sizeOptions,
    gender: genderOptions,
    age: ageOptions,
  };

  const handleFilterChange = (selectedOptions, filterName) => {
    const newValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    if (newValues.includes("all")) {
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: [],
      }));
    } else {
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: Array.from(new Set([...prevFilters[filterName], ...newValues])),
      }));
    }
  };

  const handleRemoveFilter = (filterName, value) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName].filter((item) => item !== value),
    }));
  };

  const getPlaceholder = (baseText, filterName) => {
    const count = localFilters[filterName].length;
    return count > 0 ? `${baseText} (${count})` : baseText;
  };

  const handleApplyFilters = () => {
    // console.log("Filters to be applied:", localFilters);
    onApplyFilters(localFilters);
    localStorage.setItem("filters", JSON.stringify(localFilters));
  };

  return (
    <div className="max-w-[120rem] mx-auto 2xl:px-24">
      <div className="grid grid-cols-1 gap-4">
        <FilterSelect
          options={locationOptions}
          placeholder={getPlaceholder("Location", "location")}
          onChange={(selected) => handleFilterChange(selected, "location")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterSelect
            options={petTypeOptions}
            placeholder={getPlaceholder("Pet type", "petType")}
            onChange={(selected) => handleFilterChange(selected, "petType")}
          />
          <FilterSelect
            options={sizeOptions}
            placeholder={getPlaceholder("Size", "size")}
            onChange={(selected) => handleFilterChange(selected, "size")}
          />
          <FilterSelect
            options={genderOptions}
            placeholder={getPlaceholder("Gender", "gender")}
            onChange={(selected) => handleFilterChange(selected, "gender")}
          />
          <FilterSelect
            options={ageOptions}
            placeholder={getPlaceholder("Age", "age")}
            onChange={(selected) => handleFilterChange(selected, "age")}
          />
        </div>
      </div>

      <SelectedFilters
        filters={localFilters}
        optionsMap={optionsMap}
        onRemoveFilter={handleRemoveFilter}
      />

      <div className="mt-4 flex justify-start gap-4 mb-20">
        <button
          className="bg-dark text-white text-[14px] w-full max-w-[150px] py-4 
                    font-medium rounded-full hover:bg-[#8D9F19] transition"
          onClick={handleApplyFilters}
        >
          Apply Filter
        </button>
        <button
          className="text-dark text-[14px] hover:underline"
          onClick={() => {
            setLocalFilters({ size: [], gender: [], age: [], location: [], petType: [] });
            localStorage.removeItem("filters");
          }}
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default PetFilter;