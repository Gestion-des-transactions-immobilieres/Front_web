import React from "react";
import ReviewCard from "../../components/Design/ReviewCard";


const Review = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
        Notre Equipe Développeur
      </h1>
      <div className=" flex flex-col md:flex-row gap-5 mt-5">
        <ReviewCard name="Backend team :" name1="-ALLALI Soukaina" name2="-LOUKILI Fatima"/>
        <ReviewCard  name="Web team :" name1="-HACHIMI Aymane" name2="-AKHDACH Nadia"/>
        <ReviewCard  name="Mobile team :  " name1="-AARABI Khadija" name2="-ABOUCHOUAR Hasnae"/>
      </div>
    </div>
  );
};

export default Review;