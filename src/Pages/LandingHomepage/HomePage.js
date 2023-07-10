import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import HeroSection from "../../Components/Homepage/HeroSection";
import "./Homepage.css";
import Player1 from "../../assets/Player1.png";
import Player2 from "../../assets/Player2.png";
import Player3 from "../../assets/Player3.png";
import Player4 from "../../assets/Player4.png";
import DownSort from "../../assets/DownSort.png";
import FootballerInfo from "../../Components/Homepage/FootballerInfo";
import { Link } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import Footer from "../../Components/Homepage/Footer";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader, ScaleLoader } from "react-spinners";
import {
  GetPlayersApi,
  GetRecommendedApi,
  GetTopRatedPlayersApi,
} from "../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage";

const HomePage = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [Recommendeddata, setRecommendeddata] = useState(null);
  const [TopratedPlayersdata, setTopRatedPlayesdata] = useState(null);
  const [AllPlayersdata, setAllPlayersdata] = useState(null);

  useEffect(() => {
    const getPlayerDataHome = async () => {
      setLoader(true);
      await dispatch(GetPlayersApi());
      await dispatch(GetRecommendedApi());
      await dispatch(GetTopRatedPlayersApi());
      setLoader(false);
    };
    getPlayerDataHome();
  }, []);

  const Sortdata = useSelector(
    (state) => state.reducer?.GetPlayerSlice?.gottenPlayerData?.data
  );
  const GottenRecommendeddata = useSelector(
    (state) => state.reducer?.GetPlayerSlice?.recommendedPlayersData?.data
  );
  const GottenTopRatedPlayersdata = useSelector(
    (state) => state.reducer?.GetPlayerSlice?.topRatedPlayersData?.data
  );
  useEffect(() => {
    const initial = () => {
      const endIndex = 4;
      const slicedArray =
        endIndex <= GottenRecommendeddata?.length
          ? GottenRecommendeddata.slice(0, endIndex)
          : GottenRecommendeddata;
      setRecommendeddata(slicedArray);
    };
    initial();
  }, [GottenRecommendeddata]);

  useEffect(() => {
    const initial = () => {
      const endIndex = 4;
      const slicedArray =
        endIndex <= GottenTopRatedPlayersdata?.length
          ? GottenTopRatedPlayersdata.slice(0, endIndex)
          : GottenTopRatedPlayersdata;
      setTopRatedPlayesdata(slicedArray);
    };
    initial();
  }, [GottenTopRatedPlayersdata]);

  useEffect(() => {
    const initial = () => {
      const endIndex = 8;
      const slicedArray =
        endIndex <= Sortdata?.length ? Sortdata.slice(0, endIndex) : Sortdata;
      setAllPlayersdata(slicedArray);
    };
    initial();
  }, [Sortdata]);
  const PositionSort = [
    "GoalKeeper",
    "Center backs(Defender)",
    "Fullbacks (Defender)",
    "Center midfielders",
    "Attacking midfielders",
    "Defensive midfielders",
    "Wingers",
    "Strikers",
  ];
  // console.log('Sortdata ', Sortdata)

  return (
    <div>
      <Header />
      <div className="Homepage_contents">
        <HeroSection />
        {loader ? (
          <div className="flex justify-center align-items-center mt-7">
            <ScaleLoader
              color="#58DC53"
              size={45}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            <FootballerInfo
              title="TOP RATED TALENTS"
              pathTitle="/filterPage"
              data={TopratedPlayersdata}
            />
            <FootballerInfo
              title="RECOMMENDED"
              pathTitle="/recommendedPage"
              data={Recommendeddata}
            />
          </>
        )}
        <div className="Homepage_topTalents">
          <p className="Homepage_topTalentsTopic">EXPLORE TALENT</p>

          <Link to="/filterPage" className="Homepage_topTalentsTopic">
            VIEW ALL
          </Link>
        </div>
        <div className="Homepage_SortCategory">
          <div className="InnerHomeFilter_Screen">
            {PositionSort.map((each, index) => (
              <Link
                to="/filterPage"
                className="Homepage_SortPosition"
                key={index}
              >
                {each}
              </Link>
            ))}
          </div>
        </div>
        {loader ? (
          <div className="flex justify-center align-items-center mt-7">
            <ScaleLoader
              color="#58DC53"
              size={45}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="Homepage_Sortfootballers">
            {AllPlayersdata?.map((each, index) => (
              <Link
                to={`/viewplayerprofile/${each?.user_id}`}
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
                data-aos="flip-down"
                className="Homepage_foorballersBriefInfo"
                key={index}
              >
                <img src={each?.image_url} className="Homepage_PlayersImage" />
                {each?.service_type == "open" ||
                each?.price?.service_type == "open" ? (
                  <p className="Homepage_PlayerStatus">
                    {each?.minimum || each?.price?.minimum}
                  </p>
                ) : each?.service_type == "free" ||
                  each?.price?.service_type == "free" ? (
                  <p className="Homepage_PlayerStatus">
                    {each?.minimum || each?.price?.minimum}
                  </p>
                ) : each?.service_type == "actual" ||
                  each?.price?.service_type == "actual" ? (
                  <p className="Homepage_PlayerStatus">
                    ${each?.minimum || each?.price?.minimum}
                  </p>
                ) : (
                  <p className="Homepage_PlayerStatus">
                    ${each?.minimum || each?.price?.minimum} - $
                    {each?.maximum || each?.price?.maximum}
                  </p>
                )}
                <p className="Homepage_PlayersName">
                  {each?.firstname} {each?.surname}
                </p>
                <div className="Homepage_playersPosition">
                  <p>{each?.position[0]?.position}</p>
                  <RxDotFilled />
                  <p>{each?.current_club}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
