import React from "react";
import ReviewCard from "../../components/Design/ReviewCard";
import img1 from "/assets/img/marouane.jpeg";
import img2 from "/assets/img/odaay.jpeg";
import img3 from "/assets/img/abdelhak.jpeg";

const Review = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
        Notre Equipe Specialisée
      </h1>
      <div className=" flex flex-col md:flex-row gap-5 mt-5">
        <ReviewCard img={img1} name="Marwane Oukacha" />
        <ReviewCard img={img2} name="Oday Touitou" />
        <ReviewCard img={img3} name="Abdelhak Aouane" />
      </div>
    </div>
  );
};

export default Review;