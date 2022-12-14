import "./styles/main.css";
import logoImg from "./assets/logo-esports-nlw.svg";
import { GameList } from "./modules/games/pages/GameList";
import { AdsGameBanner } from "./modules/ads/components/AdsGameBanner/AdsGameBanner";

function App() {
  return (
    <>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImg} alt="" />
        <h1 className="text-6xl text-white font-black mt-20">
          Seu{" "}
          <span className="text-transparent bg-nlw-gradient bg-clip-text">
            duo{" "}
          </span>
          está aqui.
        </h1>

        <GameList />

        <AdsGameBanner />
      </div>
    </>
  );
}

export default App;
