import { useReducer } from "react";
import { useUserAuth } from "../contexts/UserAuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  housingSituation: "",
  dailyAloneHours: "",
  workplaceAccommodation: "",
  householdComposition: "",
  hasPetExperience: "",
  currentPets: { hasPets: true, petDetails: "" },
  previousAdoption: { hasAdopted: "" },
  petSurrender: { hasSurrendered: "" },
  additionalInformation: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setHousing":
      return { ...state, housingSituation: action.payload };
    case "setAloneHours":
      return { ...state, dailyAloneHours: action.payload };
    case "setWorkPlace":
      return { ...state, workplaceAccommodation: action.payload };
    case "setHouseHold":
      return { ...state, householdComposition: action.payload };
    case "setHasPetExperience":
      return {
        ...state,
        hasPetExperience: action.payload === "yes", // Convert "yes"/"no" to boolean
      };
    case "setAdoption":
      return {
        ...state,
        previousAdoption: { hasAdopted: action.payload === "yes" }, // Convert "yes"/"no" to boolean
      };
    case "setPetSurrender":
      return {
        ...state,
        petSurrender: { hasSurrendered: action.payload === "yes" }, // Convert "yes"/"no" to boolean
      };

    case "setCurrentPets":
      return {
        ...state,
        currentPets: { ...state.currentPets, petDetails: action.payload },
      };

    case "setAdditionalInfo":
      return { ...state, additionalInformation: action.payload };
    default:
      return { ...state };
  }
}

function Questionare() {
  const { addQuestionnaireToUser, user } = useUserAuth();
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
    localDispatch,
  ] = useReducer(reducer, initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!user) {
        toast.warn('"Please log in to submit the questionnaire"', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });

        return;
      }

      const newQuestionare = {
        housingSituation,
        dailyAloneHours: Number(dailyAloneHours),
        workplaceAccommodation,
        householdComposition,
        hasPetExperience: hasPetExperience || previousAdoption.hasAdopted,
        currentPets: { 
          hasPets: hasPetExperience, 
          petDetails: hasPetExperience ? currentPets.petDetails : "" 
        },
        previousAdoption,
        petSurrender,
        additionalInformation,
      };

      console.log("Submitting questionnaire:", newQuestionare);

      await addQuestionnaireToUser(newQuestionare);
      console.log("Questionnaire saved successfully");

      const questionnaireResponse = await addQuestionnaireToUser(
        newQuestionare
      );
      console.log("Questionnaire response:", questionnaireResponse);

      const matchResponse = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/matching/calculate-bulk-matches/${user.userId}`,
        newQuestionare,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Match calculation response:", matchResponse.data);
      toast.success("Questionnaire submitted successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error submitting questionnaire:", error.response || error);
      toast.error(
        ` ${error.response?.data?.message} ||"There was an error submitting your questionnaire. Please try again."`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  }

  return (
    <div className="queContainer absolute -top-[10rem] left-[25%] bg-light w-[50%]  mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[5rem] shadow-sm">
       <h2 className="text-dark text-[22px] font-semibold -mt-4 text-center mb-6">
        Please Fill out the form below
      </h2>
      <form
        className="questionareForm flex flex-col gap-[3rem] -mt-6 w-[80%] mx-auto text-[1.6rem]"
        onSubmit={handleSubmit}
      >
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="housing">Please Select Your Housing Situation</label>
          <select
              className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
              placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
              focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
              style={{
                appearance: 'none', 
                backgroundColor: '#FAFAF5', 
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"><path d="M5.5 7l4.5 5 4.5-5h-9z"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 20px center', 
                backgroundSize: '16px',
                 }}
            value={housingSituation}
            onChange={(e) =>
              localDispatch({ type: "setHousing", payload: e.target.value })
            }
          >
            <option value="">Please Select An Option</option>
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
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
            type="number"
            placeholder="Please enter a number"
            value={dailyAloneHours}
            onChange={(e) =>
              localDispatch({ type: "setAloneHours", payload: e.target.value })
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
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
            style={{
              appearance: 'none', 
                backgroundColor: '#FAFAF5', 
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"><path d="M5.5 7l4.5 5 4.5-5h-9z"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 20px center', 
                backgroundSize: '16px',
            }}
            value={workplaceAccommodation}
            onChange={(e) =>
              localDispatch({
                type: "setWorkPlace",
                payload: e.target.value,
              })
            }
            id="workplaceAccommodation"
          >
            <option value="">Please Select An Option</option>
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
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
            type="text"
            placeholder="Please describe your household"
            value={householdComposition}
            onChange={(e) =>
              localDispatch({ type: "setHouseHold", payload: e.target.value })
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
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
            style={{
              appearance: 'none', 
                backgroundColor: '#FAFAF5', 
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"><path d="M5.5 7l4.5 5 4.5-5h-9z"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 20px center', 
                backgroundSize: '16px',
            }}
            value={
              hasPetExperience ? "yes" : hasPetExperience === false ? "no" : ""
            }
            onChange={(e) =>
              localDispatch({
                type: "setHasPetExperience",
                payload: e.target.value,
              })
            }
            id="hasPetExperience"
          >
            <option value="">Please Select An Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {hasPetExperience && (
          <div className="inputGroup flex flex-col gap-[1.5rem]">
            <label htmlFor="currentPets">
              What type of pets do you currently have?
            </label>
            <select
              className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
              placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
              focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
              style={{
                appearance: 'none', 
                backgroundColor: '#FAFAF5', 
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"><path d="M5.5 7l4.5 5 4.5-5h-9z"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 20px center', 
                backgroundSize: '16px',
              }}
              value={currentPets.petDetails}
              onChange={(e) =>
                localDispatch({
                  type: "setCurrentPets",
                  payload: e.target.value,
                })
              }
              id="currentPets"
            >
              <option value="">Please Select An Option</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
            {currentPets.petDetails !== "cat" &&
              currentPets.petDetails !== "dog" && (
                <input
                  className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
                  type="text"
                  placeholder="Please specify your pet"
                  value={currentPets.petDetails}
                  onChange={(e) =>
                    localDispatch({
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
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
            style={{
              appearance: 'none', 
                backgroundColor: '#FAFAF5', 
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"><path d="M5.5 7l4.5 5 4.5-5h-9z"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 20px center', 
                backgroundSize: '16px',
            }}
            value={
              previousAdoption.hasAdopted === true
                ? "yes"
                : previousAdoption.hasAdopted === false
                ? "no"
                : ""
            }
            onChange={(e) =>
              localDispatch({
                type: "setAdoption",
                payload: e.target.value,
              })
            }
            id="previousAdoption"
          >
            <option value=""> Please Select An Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="petSurrender">
            Have you ever surrendered any pet?
          </label>
          <select
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
            style={{
              appearance: 'none', 
              backgroundColor: '#FAFAF5', 
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"><path d="M5.5 7l4.5 5 4.5-5h-9z"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 20px center', 
              backgroundSize: '16px',
            }}
            value={
              petSurrender.hasSurrendered === true
                ? "yes"
                : petSurrender.hasSurrendered === false
                ? "no"
                : ""
            }
            onChange={(e) =>
              localDispatch({
                type: "setPetSurrender",
                payload: e.target.value,
              })
            }
            id="petSurrender"
          >
            <option value="">Please Select An Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="additionalInfo">
            Any other information we should know?
          </label>
          <textarea
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-[24px] focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-56"
            type="text"
            placeholder="Please Write here"
            value={additionalInformation}
            onChange={(e) =>
              localDispatch({
                type: "setAdditionalInfo",
                payload: e.target.value,
              })
            }
            id="additionalInfo"
          />
        </div>
< div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium rounded-full 
    hover:bg-[#8D9F19] transition"
        >
          Submit
        </button>
        </div>
      </form>
      <ToastContainer className="text-[1.4rem] w-[30%]" />
    </div>
  );
}

export default Questionare;
