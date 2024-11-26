import { useReducer, useState } from "react";

const initialState = {
  housingSituation: "apartment_shared_entrance",
  dailyAloneHours: 0,
  workplaceAccommodation: "yes",
  householdComposition: "",
  hasPetExperience: false,
  currentPets: { hasPets: true, petDetails: "dog" },
  previousAdoption: { hasAdopted: true },
  petSurrender: { hasSurrendered: true },
  additionalInformation: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setHousing":
      return { ...state, housingSituation: action.payload };
    case "setAloneHours":
      return { ...state, dailyAloneHours: Number(action.payload) };
    case "setWorkPlace":
      return { ...state, workplaceAccommodation: action.payload };
    case "setHouseHold":
      return { ...state, householdComposition: action.payload };
    case "setHasPetExperience":
      return {
        ...state,
        hasPetExperience: action.payload === "true",
      };

    case "setCurrentPets":
      return {
        ...state,
        currentPets: { ...state.currentPets, petDetails: action.payload },
      };
    case "setAdoption":
      return {
        ...state,
        previousAdoption: { hasAdopted: action.payload === "true" },
      };
    case "setPetSurrender":
      return {
        ...state,
        petSurrender: { hasSurrendered: action.payload === "true" },
      };
    case "setAdditionalInfo":
      return { ...state, additionalInformation: action.payload };
    default:
      return { ...state };
  }
}

function Questionare({ handleClose, userId }) {
  const [
    {
      housingSituation,
      dailyAloneHours,
      workplaceAccommodation,
      householdComposition,
      hasPetExperience,
      currentPets,
      previousAdoption,
      petSurrender,
      additionalInformation,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [questionare, setQuestionare] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestionare = {
      userId,
      housingSituation,
      dailyAloneHours,
      workplaceAccommodation,
      householdComposition,
      hasPetExperience,
      currentPets: hasPetExperience
        ? currentPets
        : { hasPets: false, petDetails: "" },
      previousAdoption,
      petSurrender,
      additionalInformation,
    };
    setQuestionare(newQuestionare);
  }
  console.log(questionare);
  return (
    <div className="relative bg-light w-[50%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[10rem] shadow-2xl">
      <button
        className="text-[1.6rem] absolute top-[5rem] right-[10rem]"
        onClick={handleClose}
      >
        X
      </button>
      <h2 className="text-[2.4rem] font-bold">
        Please Fill out the form below
      </h2>
      <form
        className="questionareForm flex flex-col gap-[5rem] w-[60%] mx-auto text-[1.6rem]"
        onSubmit={handleSubmit}
      >
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="housing">Please Select Your Housing Situation</label>
          <select
            className="text-[1.4rem] border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            value={housingSituation}
            onChange={(e) =>
              dispatch({ type: "setHousing", payload: e.target.value })
            }
          >
            <option value="apartment_shared_entrance">
              Apartment (shared entrance)
            </option>
            <option value="apartment_separate_entrance">
              Apartment (separate entrance)
            </option>
            <option value="house">House</option>
            <option value="mostly_outdoors">Mostly Outdoors</option>
          </select>
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="dailyAloneHours">
            How many hours in a day the pet would be alone?
          </label>
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="text"
            placeholder="Please enter a number"
            value={dailyAloneHours}
            onChange={(e) =>
              dispatch({ type: "setAloneHours", payload: e.target.value })
            }
            id="dailyAloneHours"
            required
          />
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="workplaceAccommodation">
            Can you take your pet to your work place?
          </label>
          <select
            className="text-[1.4rem] border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            value={workplaceAccommodation}
            onChange={(e) =>
              dispatch({
                type: "setWorkPlace",
                payload: e.target.value,
              })
            }
            id="workplaceAccommodation"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not_necessary">It is not necessary</option>
          </select>
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="houseHold">
            Please specify the number of adults and children in your household,
            including their ages.
          </label>
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="text"
            placeholder="Please describe your household"
            value={householdComposition}
            onChange={(e) =>
              dispatch({ type: "setHouseHold", payload: e.target.value })
            }
            id="houseHold"
            required
          />
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="hasPetExperience">
            Do you Currenctly own any pets?
          </label>
          <select
            className="text-[1.4rem] border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            value={hasPetExperience}
            onChange={(e) =>
              dispatch({
                type: "setHasPetExperience",
                payload: e.target.value,
              })
            }
            id="hasPetExperience"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        {hasPetExperience && (
          <div className="inputGroup flex flex-col gap-[1.5rem]">
            <label htmlFor="currentPets">
              What type of pets do you currently have?
            </label>
            <select
              className="text-[1.4rem] border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
              value={currentPets.petDetails}
              onChange={(e) =>
                dispatch({
                  type: "setCurrentPets",
                  payload: e.target.value,
                })
              }
              id="currentPets"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
            {currentPets.petDetails !== "cat" &&
              currentPets.petDetails !== "dog" && (
                <input
                  className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
                  type="text"
                  placeholder="Please specify your pet"
                  value={currentPets.petDetails}
                  onChange={(e) =>
                    dispatch({
                      type: "setCurrentPets",
                      payload: e.target.value,
                    })
                  }
                  required
                />
              )}
          </div>
        )}
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="previousAdoption">Have you ever adopt any pet?</label>
          <select
            className="text-[1.4rem] border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            value={previousAdoption.hasAdopted}
            onChange={(e) =>
              dispatch({
                type: "setAdoption",
                payload: e.target.value,
              })
            }
            id="previousAdoption"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="petSurrender">
            Have you ever surrendered any pet?
          </label>
          <select
            className="text-[1.4rem] border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            value={petSurrender.hasSurrendered}
            onChange={(e) =>
              dispatch({
                type: "setPetSurrender",
                payload: e.target.value,
              })
            }
            id="petSurrender"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="additionalInfo">
            Any other information we should know?
          </label>
          <textarea
            className="border-2 border-dark text-dark bg-transparent border-dashed p-[0.5rem] w-full h-[12rem]"
            type="text"
            placeholder="Please Write here"
            value={additionalInformation}
            onChange={(e) =>
              dispatch({ type: "setAdditionalInfo", payload: e.target.value })
            }
            id="additionalInfo"
          />
        </div>
        {/* <input
          className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            dispatch({ type: "setEmail", payload: e.target.value })
          }
          required
        /> */}
        {/* <input
          className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            dispatch({ type: "setPassword", payload: e.target.value })
          }
          required
        /> */}

        <button
          type="submit"
          className="text-[1.6rem] text-white bg-red w-[50%] py-[1rem] rounded-[4rem] mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Questionare;
