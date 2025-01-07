import React from "react";

const ReviewCard = (props) => {
  return (
    <div className=" w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      

      <div className=" flex flex-row justify-center items-center mt-4 gap-4">
       
        <h3 className=" font-semibold "><solid>{props.name}</solid> <br/>{props.name1}<br/>{props.name2}</h3>
      </div>
    </div>
  );
};

export default ReviewCard;