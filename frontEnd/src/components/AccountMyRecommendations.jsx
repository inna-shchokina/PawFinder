import { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../contexts/UserAuthContext";
import PetCard from "./PetCard";
import Loading from "./Loading";
import Error from "./Error";

function AccountMyRecommendations() {
  const { user, isAuthenticated } = useUserAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecommendations = async () => {
    if (!isAuthenticated || !user?.userId) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pets`,
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

      const recommendationsWithScores = response.data
        .map((pet) => ({
          ...pet,
          matchScore: matchScores[pet._id] || null,
        }))
        .filter(
          (pet) =>
            pet.matchScore && pet.matchScore >= 70 && pet.matchScore <= 100
        )
        .sort((a, b) => b.matchScore - a.matchScore);

      setRecommendations(recommendationsWithScores);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

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
        <h1 className="text-[30px] font-black mb-6">MY RECOMMENDATIONS</h1>
        <p className="text-[16px] text-dark">
          <Loading />
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[3rem] font-black mb-6">MY RECOMMENDATIONS</h1>
        <p className="text-[1.6rem] text-red-600">
          <Error />
        </p>
      </main>
    );
  }

  if (recommendations.length === 0) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[3rem] font-black mb-6">MY RECOMMENDATIONS</h1>
        <p className="text-[1.6rem] text-dark">No recommendations available</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-16 mt-2">
      <aside className="w-[80%] lg:w-[70rem]">
        <h1 className="text-[3rem] font-black mb-6">MY RECOMMENDATIONS</h1>
        <div className="h-auto">
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendations.map((pet, index) => (
                <PetCard
                  key={pet._id}
                  pet={pet}
                  index={index}
                  getStyleForCard={getStyleForCard}
                  context="recommendations"
                  isFavorite={user?.favorites?.includes(pet._id)}
                />
              ))}
            </div>
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </aside>
    </main>
  );
}

export default AccountMyRecommendations;
