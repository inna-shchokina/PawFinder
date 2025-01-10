import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";
import ApplicationPopup from "../components/ApplicationPopup";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { ToastContainer, toast } from "react-toastify";

function Pet() {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [matchDetails, setMatchDetails] = useState(null);
  const [images, setImages] = useState([]);
  const [curImage, setCurImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); //Inna: I added this line
  const { user, isAuthenticated } = useUserAuth();
  const [matchLoading, setMatchLoading] = useState(true);
  const [shelterData, setShelterData] = useState({});
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites.includes(id) || false
  );
  const navigate = useNavigate();

  // useEffect(
  //   function () {
  //     async function getPet() {
  //       try {
  //         setLoading(true);
  //         const res = await axios.get(
  //           `${import.meta.env.VITE_BACKEND_URL}/api/pets/${id}`
  //         );
  //         setPet(res.data);
  //         setImages(res.data.pictures || []);
  //         setCurImage(res.data.pictures?.[0]);
  //         setLoading(false);
  //       } catch (error) {
  //         setError(true);
  //         throw new Error(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     getPet();
  //   },
  //   [id]
  // );

  useEffect(
    function () {
      async function getPet() {
        try {
          setLoading(true);
          // Only fetch pet details first
          const petRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/pets/${id}`
          );
          setPet(petRes.data);
          setImages(petRes.data.pictures || []);
          setCurImage(petRes.data.pictures?.[0]);

          // Fetch shelter data
        if (petRes.data.ownerId) {
          const shelterRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/shelters/${petRes.data.ownerId}`
          );
          setShelterData(shelterRes.data);
        }

        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      getPet();
    },
    [id]
  );

  useEffect(
    function () {
      async function getMatchDetails() {
        if (!user?.userId) return;

        try {
          setMatchLoading(true);
          const matchRes = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/matching/result-with-details/${user.userId}/${id}`
          );
          setMatchDetails(matchRes.data);
        } catch (error) {
          console.error("Error fetching match details:", error);
        } finally {
          setMatchLoading(false);
        }
      }
      getMatchDetails();
    },
    [id, user?.userId]
  );

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

  function handleCurImage(img) {
    const index = images.indexOf(img.src);
    setCurImage(images[index]);
  }

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
      if (isFavorite) {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}`,
          { data: { petId: id }, withCredentials: true }
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}`,
          { petId: id },
          { withCredentials: true }
        );
      }
      setIsFavorite((prev) => !prev);
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

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div>
        <Error />
      </div>
    );
  if (!pet) return <div>Pet not found</div>;

  const openPopup = () => setIsPopupOpen(true); //Inna: I added this line
  const closePopup = () => setIsPopupOpen(false); //Inna: I added this line

  return (
    <div className="flex items-center justify-center min-h-screen">
    <main className="relative left-[7%] my-[4rem] px-[4rem] py-10 flex flex-col gap-[3rem]">
      <div className="flex flex-col items-center lg:flex-row lg:items-stretch w-full  mx-auto gap-[8rem]">
        <div className="petImages  w-[80%] lg:w-[40%]">
          <figure className="w-full">
            <img src={curImage} alt="dog" className="w-full rounded-[5rem]" />
          </figure>
          <div className="flex justify-between w-full">
            {images.map((img) => (
              <img
                src={img}
                alt={pet.name}
                key={img}
                className="w-[7.5rem] h-[7.5rem] md:w-[10rem] md:h-[10rem] mt-[3rem] rounded-[1.5rem]"
                onClick={(e) => handleCurImage(e.target)}
              />
            ))}
          </div>
        </div>
        <div className="dogInfo flex flex-col justify-between w-[80%] lg:w-[40%] gap-[3rem] lg:gap-0">
          <div className="flex flex-col gap-[1rem] ">
            <h2 className="text-[4rem] uppercase font-black">{pet.name}</h2>
            <p className="text-[1.6rem]">{pet.breed}</p>
            <p className="text-[1.6rem]">
              {pet.gender} • {calculateAge(pet.age)} • {pet.size}
            </p>
            <p className="text-[1.6rem]">
            <strong>Shelter:</strong>{" "}
              {shelterData ? (
                <Link
                  to={`/shelters/${pet.ownerId}`}
                  className="text-[#8D9E29] hover:underline font-semibold"
                >
                  {shelterData.companyName}
                </Link>
              ) : (
                <span className="text-gray-500">Loading shelter...</span>
              )}
            </p>
          </div>
          <div className="w-full h-[1px] bg-gray-300 -mt-8"></div>
          <div className="flex flex-col gap-[1rem]">
            <h3 className="text-[2rem] font-bold uppercase -mt-8 mb-2">About Me</h3>
            <div className="text-[1.6rem] font-semibold flex flex-col gap-[1rem]">
            <p className="flex gap-[5.3rem]">
  <span className="flex items-center gap-3">
    <img
      src={pet.vaccinated ? "/images/Check_circle.png" : "/images/no_circle.png"}
      alt={pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
      className="w-10 h-10"
    />
    Vaccinated
  </span>
  <span className="flex items-center gap-3">
    <img
      src={pet.neutured ? "/images/Check_circle.png" : "/images/no_circle.png"}
      alt={pet.neutured ? "Neutured" : "Not Neutured"}
      className="w-10 h-10"
    />
    Neutured
  </span>
</p>
<p className="flex gap-[6.7rem]">
  <span className="flex items-center gap-3">
    <img
      src={pet.microchipped ? "/images/Check_circle.png" : "/images/no_circle.png"}
      alt={pet.microchipped ? "Microchipped" : "Not Microchipped"}
      className="w-10 h-10"
    />
    Microchip
  </span>
  <span className="flex items-center gap-3">
    <img
      src={
        pet.sociableWithOtherPets ? "/images/Check_circle.png" : "/images/no_circle.png"
      }
      alt={
        pet.sociableWithOtherPets
          ? "Friendly with other pets"
          : "Not friendly with other pets"
      }
      className="w-10 h-10"
    />
    Friendly with other pets
  </span>
</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-300 -mt-8"></div>
          <div className="dogStory">
            <h3 className="text-[2rem] font-bold uppercase mb-2 -mt-8">My Story</h3>
            <p className="text-justify text-[1.6rem]">
              {pet.petStory.split("<br/>")[0]} <br />{" "}
              {pet.petStory.split("<br/>")[1]}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openPopup}
              className="bg-dark text-white text-[14px] w-full max-w-[15rem] py-4 
                    font-medium rounded-full hover:bg-[#8D9F19] transition"
            >
              Adopt me
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
        {isPopupOpen && <ApplicationPopup pet={pet} onClose={closePopup} />}{" "}
        {/*Inna: I added this line*/}
      </div>
      {user?.userId && (
        <div className="matchDetails w-[1170px] rounded-[3rem] bg-[#E7E7D6] py-[3rem] px-[5rem]">
          <h3 className="text-[2rem] font-bold uppercase">Match Details</h3>
          {matchLoading ? (
            <p className="text-justify text-[1.6rem]">
              Calculating your match...
            </p>
          ) : matchDetails?.adopterExplanation ? (
            <p className="text-justify text-[1.6rem]">
              {matchDetails.adopterExplanation}
            </p>
          ) : null}
        </div>
      )}
      <ToastContainer className="text-[1.4rem w-[30%]" />
    </main>
    </div>
  );
}

export default Pet;
