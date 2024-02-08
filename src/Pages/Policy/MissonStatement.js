import React, { useEffect } from "react";
import "../LandingHomepage/Homepage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Homepage/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ScoutHeader from "../../Components/Header/ScoutHeader";

const MissonStatement = () => {
  const userData = useSelector((state) => state.reducer.LoginSlice?.logindata);

  return (
    <div>
      <div className="max-w-[1400px] mx-auto shadow-lg">
        {userData ? <ScoutHeader /> : <Header />}
        {/* <div className="Homepage_contents"> */}
        <div className="Homepricingpage_section flex flex-col lg:flex-row min-h-[90vh] px-[2rem] md:px-[8rem] items-center justify-between">
          <div className="container mx-auto p-8 bg-green-100">
            <h1 className="text-4xl font-bold mb-6 text-green-800">
              Welcome to AfriSportPro
            </h1>

            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-green-800">
                VISION AND MISSION STATEMENT
              </h2>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">VISION</h3>
                <p className="text-green-700">
                  AfriSportPro carries the vision of becoming Africa’s leading
                  intermediary between young African football talents, talent
                  managers, professional football scouts, and notable football
                  clubs across the globe. The platform strives to establish
                  Africa’s largest market featuring rising talent profiles,
                  respective talent managers, and verified football scouts for
                  professional football clubs worldwide.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">MISSION</h3>
                <p className="text-green-700">
                  AfriSportPro aims at connecting young African football talents
                  to professional scouts and talent managers across the globe.
                  With a sole objective of giving the hindered exposure to
                  rising talents across Africa. And in turn, allowing verified
                  scouts of different football clubs with an array of talented
                  players to pick from, at their disposal.
                </p>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MissonStatement;
