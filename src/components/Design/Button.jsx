import React from "react";

const Button = (props) => {
  return (
    <div>
  <button className="px-6 py-1 bg-blue-600 text-white border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition-all rounded-full">
    {props.title}
  </button>
</div>

  );
};

export default Button;