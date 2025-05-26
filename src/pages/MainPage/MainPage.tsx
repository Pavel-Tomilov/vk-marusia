import { FetchRandomMovie } from "./RandomMovie/FetchRandomMovie";
import { FetchTop10 } from "./Top10Movies/FetchTop10";

const MainPage = () => {
  return (
    <>
      <FetchRandomMovie />
      <FetchTop10 />
    </>
  );
};

export default MainPage;
