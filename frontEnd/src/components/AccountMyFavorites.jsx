import { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../contexts/UserAuthContext";
import PetCard from "./PetCard";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

function AccountMyFavorites() {
  const { user, isAuthenticated } = useUserAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    if (!isAuthenticated || !user?.userId) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${
          user.userId
        }/favorites`,
        { withCredentials: true }
      );

      // matchScore
      const matchesResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/matching/user/${
          user.userId
        }/scores`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const matchScores = matchesResponse.data.reduce((acc, match) => {
        acc[match.petId] = match.score;
        return acc;
      }, {});

      // matchScore
      const favoritesWithScores = response.data
        .map((pet) => ({
          ...pet,
          matchScore: matchScores[pet._id] || null,
        }))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

      setFavorites(favoritesWithScores);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFromFavorites = (petId) => {
    setFavorites((prev) => prev.filter((pet) => pet._id !== petId));
  };

  const styleConfig = [
    { svg: "/images/card_figure_yellow.svg", color: "#FEDB66" },
    { svg: "/images/card_figure_red.svg", color: "#FD7E6F" },
    { svg: "/images/card_figure_green.svg", color: "#BFCF59" },
  ];

  const getStyleForCard = (index) => {
    const rowIndex = Math.floor(index / 2);
    const columnIndex = index % 2;
    const styleIndex = (rowIndex + columnIndex) % styleConfig.length;
    return styleConfig[styleIndex];
  };

  if (loading) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[3rem] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[1.6rem] text-dark">
          <Loading />
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[3rem] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[1.6rem] text-red-600">
          <Error />
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-16 mt-2">
      <h1 className="text-[3rem] font-black mb-6">MY FAVORITES</h1>
      {favorites.length === 0 ? (
        <div>
          <p className="text-[1.6rem] text-dark">
            You don’t have any new favorites added yet
          </p>
          <button
            onClick={() => navigate("/pets")}
            className="mt-10 bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium 
            rounded-full hover:bg-[#8D9F19] transition"
          >
            Choose a pet
          </button>
        </div>
      ) : (
        <aside className="w-[80%] lg:w-[70rem]">
          <div className="h-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favorites.map((pet, index) => (
                <PetCard
                  key={pet._id}
                  pet={pet}
                  index={index}
                  getStyleForCard={getStyleForCard}
                  context="favorites"
                  onRemoveFromFavorites={removeFromFavorites}
                  isFavorite={true}
                />
              ))}
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}

export default AccountMyFavorites;
