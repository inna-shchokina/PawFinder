import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function PetCard({
  pet,
  index,
  getStyleForCard,
  context = "Pets",
  onRemoveFromFavorites,
  isFavorite: propIsFavorite,
}) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserAuth();
  const [isFavorite, setIsFavorite] = useState(propIsFavorite || false);

  useEffect(() => {
    if (propIsFavorite !== undefined) {
      setIsFavorite(propIsFavorite);
    }
  }, [propIsFavorite]);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated || !user?.userId) {
      toast.warn("Please log in to manage favorites.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      navigate("/login");
      return;
    }
    try {
      if (context === "favorites") {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}`,
          { data: { petId: pet?._id }, withCredentials: true }
        );
        onRemoveFromFavorites(pet._id);
      } else {
        if (isFavorite) {
          await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}`,
            { data: { petId: pet?._id }, withCredentials: true }
          );
        } else {
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}`,
            { petId: pet?._id },
            { withCredentials: true }
          );
        }
        setIsFavorite((prev) => !prev);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Failed to update favorites. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const calculateAge = (birthDate) => {
    const now = new Date();
    const birth = new Date(birthDate);

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return years > 0
      ? `${years} year${years > 1 ? "s" : ""}`
      : `${months} month${months > 1 ? "s" : ""}`;
  };

  const handleCardClick = async () => {
    navigate(`/pets/${pet._id}`);

    if (user?.userId) {
      try {
        console.log("Checking match details for:", {
          userId: user.userId,
          petId: pet._id,
        });

        const matchResponse = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/matching/result-with-details/${user.userId}/${pet._id}`
        );

        console.log("Match response:", matchResponse.data);

        if (!matchResponse.data?.adopterExplanation) {
          console.log("No explanation found, calculating match...");
          await axios.post(

            `${import.meta.env.VITE_BACKEND_URL}/api/matching/calculate-match/${
              user.userId
            }/${pet._id}`
          );
        }
      } catch (error) {
        console.error("Error getting match details:", error.response || error);
      }
    } else {
      console.log("User not logged in, proceeding to pet details");
    }

  };

  const { svg, color } = getStyleForCard(index);

  return (
    <div
      className="w-[50rem] sm:w-[33rem] relative rounded-[36px] shadow-lg overflow-hidden bg-white flex flex-col 
                transform transition-transform duration-300 hover:scale-105 hover:rotate-2 cursor-pointer mb-2"
      onClick={handleCardClick}
    >
      <div className="relative w-full bg-[#FFFFFF] rounded-t-[36px] h-[400px] overflow-hidden">
        <img
          src={pet.pictures && pet.pictures[0]}
          alt={pet.breed}
          className="w-full h-[300px] object-cover"
        />
      </div>
      <div className="relative flex-grow bg-[#FFF] rounded-b-[36px]">
        <img
          src={svg}
          alt="decorative SVG"
          className="absolute bottom-0 left-0 w-full h-auto object-cover"
        />
        <div className="absolute bottom-6 left-0 right-0 px-10 py-4 text-left">
          <div className="mb-6">
            {/* Scorematch */}
            {/* {isAuthenticated && pet.matchScore !== null && (
              <div className="absolute -top-2 right-6 w-[70px] h-[70px]">
                <div
                  className="absolute inset-0 rounded-full bg-[#FAFAF5] border-[6px]"
                  style={{ borderColor: color }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[17px] font-bold text-[#505865]">{`${pet.matchScore}%`}</p>
                </div>
              </div>
            )} */}
            {isAuthenticated && pet.matchScore !== null && pet.matchScore !== undefined && (
  <div className="absolute -top-2 right-6 w-[70px] h-[70px]">
    <div
      className="absolute inset-0 rounded-full bg-[#FAFAF5] border-[6px]"
      style={{ borderColor: color }}
    ></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-[17px] font-bold text-[#505865]">{`${pet.matchScore}%`}</p>
    </div>
  </div>
)}
            <h2 className="text-[18px] font-bold text-dark mb-2">
              {pet.name}, {calculateAge(pet.age)}
            </h2>
            <div className="flex items-center gap-2">
              <img
                src="/images/location.svg"
                alt="Location"
                className="w-7 h-7"
              />
              <p className="text-[16px] font-normal text-dark">
                {pet.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-dark text-white text-[14px] w-full max-w-[150px] py-4 
                    font-medium rounded-full hover:bg-[#8D9F19] transition"
            >
              More info
            </button>
            <div
              onClick={handleFavoriteClick}
              className={`w-16 h-16 flex items-center justify-center rounded-full transition 
                ${
                  isFavorite
                    ? "bg-dark"
                    : "border border-dark group hover:bg-dark"
                }`}
            >
              <img
                src="/images/favorites.svg"
                alt="Favorite"
                className={`w-8 h-8 transition 
                  ${isFavorite ? "invert" : "group-hover:invert"}`}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="text-[1.4rem] w-[30%]" />
    </div>
  );
}

export default PetCard;
