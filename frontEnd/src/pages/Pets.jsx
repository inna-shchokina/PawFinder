import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../contexts/UserAuthContext";
import PetHeader from "../components/PetHeader";
import PetFilter from "../components/PetFilter";
import PetList from "../components/PetList";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Pets() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useUserAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    location: [],
    age: [],
    size: [],
    petType: searchParams.get("type") ? [searchParams.get("type")] : [],
    gender: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styleConfig = [
    { svg: "/images/card_figure_yellow.svg", color: "#FEDB66" },
    { svg: "/images/card_figure_red.svg", color: "#FD7E6F" },
    { svg: "/images/card_figure_green.svg", color: "#BFCF59" },
  ];

  const getStyleForCard = (index) => {
    const rowIndex = Math.floor(index / 3);
    const columnIndex = index % 3;
    const styleIndex = (rowIndex + columnIndex) % styleConfig.length;
    return styleConfig[styleIndex];
  };

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pets`,
        {
          params: {
            location:
              filters.location.length > 0
                ? filters.location.join(",")
                : undefined,
            age: filters.age.length > 0 ? filters.age : undefined,
            size: filters.size.length > 0 ? filters.size.join(",") : undefined,
            gender:
              filters.gender.length > 0 ? filters.gender.join(",") : undefined,
            petType:
              filters.petType.length > 0
                ? filters.petType.join(",")
                : undefined,
          },
        }
      );

      if (user?.userId) {
        const matchesResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/matching/user/${
            user.userId
          }/scores`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

      const matchScores = matchesResponse.data.reduce((acc, match) => {
        acc[match.petId] = typeof match.score === 'number' ? match.score : null;
        return acc;
      }, {});

      const petsWithScores = response.data
        .map((pet) => ({
          ...pet,
          matchScore: matchScores[pet._id] !== undefined ? matchScores[pet._id] : null,
        }))
        .sort((a, b) => {
          const scoreA = typeof a.matchScore === 'number' ? a.matchScore : -1;
          const scoreB = typeof b.matchScore === 'number' ? b.matchScore : -1;
          return scoreB - scoreA;
        });

      console.log('Pets with scores:', petsWithScores);
      setPets(petsWithScores);
    } else {
      setPets(response.data);
    }
  } catch (err) {
    console.error("Error in fetchPets:", {
      message: err.message,
      fullError: err,
    });
    setError(true);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPets();
  }, [filters, user?.userId]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const activeFilterCount = Object.values(filters).reduce(
    (total, current) => total + current.length,
    0
  );

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl) {
      setFilters((prev) => ({
        ...prev,
        petType: [typeFromUrl],
      }));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="px-8 sm:px-8 xl:px-[200px] 2xl:px-[250px] lg:px-8 md:px-8 py-10">
        <PetHeader
          toggleFilters={() => setShowFilters((prev) => !prev)}
          isFilterOpen={showFilters}
          activeFilterCount={activeFilterCount}
        />
        {showFilters && <PetFilter onApplyFilters={applyFilters} />}
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] mt-20">
            <img
              src="/images/filter_notFound.svg"
              alt="No results found"
              className="w-[110px] h-[110px] mb-6"
            />
            <h2 className="text-[16px] font-semibold text-dark mt-4">
              We didn&apos;t find anything
            </h2>
            <p className="text-dark text-[12px] font-normal mt-2">
              Try different filter settings
            </p>
          </div>
        ) : (
          <PetList
            pets={pets}
            getStyleForCard={getStyleForCard}
            userFavorites={user?.favorites || []}
          />
        )}
      </div>
    </div>
  );
}

export default Pets;
