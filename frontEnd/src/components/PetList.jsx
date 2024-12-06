import React from "react";
import PetCard from "./PetCard";

const PetList = ({
  pets,
  getStyleForCard,
  userFavorites = [],
  gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ",
}) => {
  return (
    <div
      className={`grid ${gridCols} gap-[5rem] mb-20 max-w-[105rem] mx-auto justify-items-center`}
    >
      {pets.map((pet, index) => (
        <PetCard
          key={pet._id}
          pet={pet}
          index={index}
          getStyleForCard={getStyleForCard}
          context="Pets"
          isFavorite={userFavorites.includes(pet._id)}
        />
      ))}
    </div>
  );
};

export default PetList;
