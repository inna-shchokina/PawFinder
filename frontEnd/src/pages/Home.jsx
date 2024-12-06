import { useEffect, useState } from "react";
import AdoptSection from "../components/AdoptSection";
import ChoseSection from "../components/ChoseSection";
import Hero from "../components/Hero";
import Questionare from "../components/Questionare";
import { useUserAuth } from "../contexts/UserAuthContext";

function Home() {
  const { user } = useUserAuth();
  const [blur, setBlur] = useState(false);
  useEffect(
    function () {
      if (user && !user.questionnaire) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    },
    [user]
  );
  return (
    <main className="my-[15rem] relative">
      <Hero blur={blur} />
      <ChoseSection />
      <AdoptSection />
      {user && !user.questionnaire && <Questionare />}
    </main>
  );
}

export default Home;
