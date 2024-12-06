import { cloneElement, useEffect, useState } from "react";
import Map from "../components/Map";
import ShelterList from "../components/ShelterList";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Shelters() {
  const [shelters, setShelters] = useState([]);
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mapPosition, setMapPosition] = useState([
    52.57406013947362, 13.546103696125384,
  ]);

  useEffect(function () {
    async function getShelters() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/shelters`
        );
        setShelters(res.data);
      } catch (error) {
        setError(true);
        throw new Error("there was a problem fetching shelters", error);
      } finally {
        setLoading(false);
      }
    }
    getShelters();
  }, []);

  function handleClick(shelter, i) {
    setActiveStateIndex(i);
    setMapPosition([
      shelter.position.coordinates[1],
      shelter.position.coordinates[0],
    ]);
  }

  return (
    <main className="my-[2.5rem] px-[4rem] py-10">
      <h2 className="text-[3.5rem] font-black mb-[3rem] uppercase">
        Which Shelter is best for you?
      </h2>
      <div className="sheltersContainer flex flex-col gap-[3rem] items-center md:items-stretch md:gap-0 md:flex-row justify-between">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <ShelterList
            shelters={shelters}
            handleClick={handleClick}
            activeStateIndex={activeStateIndex}
          />
        )}

        <Map
          shelters={shelters}
          mapPosition={mapPosition}
          setActiveStateIndex={setActiveStateIndex}
        />
      </div>
    </main>
  );
}

export default Shelters;
