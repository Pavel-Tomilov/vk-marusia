import React, { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthModalProvider } from "./components/Modal/AuthModal/AuthModalContext";
import { AuthModal } from "./components/Modal/AuthModal/AuthModal";
import { Loader } from "./components/Loader/Loader";
import "./styles/main.scss";

const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyAboutMoviePage = lazy(
  () => import("./pages/AboutMoviePage/FetchAboutMoviePage")
);
const LazyGenresPage = lazy(() => import("./pages/GenresPage/FetchGenresPage"));
const LazyMoviesByGenrePage = lazy(
  () => import("./pages/MoviesByGenre/FetchMoviesByGenrePage")
);
const LazyAccountPage = lazy(
  () => import("./pages/AccountPage/FetchAccountPage")
);

const App = () => {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <AuthModal />
        <Header />
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<LazyMainPage />} />
              <Route path="/movie/:movieId" element={<LazyAboutMoviePage />} />
              <Route path="/movie/genres" element={<LazyGenresPage />} />
              <Route path="/movie" element={<LazyMoviesByGenrePage />} />
              <Route path="/account" element={<LazyAccountPage />} />
            </Routes>
          </Suspense>
        </main>
      </AuthModalProvider>
      <Footer />
    </BrowserRouter>
  );
};

export default React.memo(App);
