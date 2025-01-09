import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Design/Button";
  const SimpleCustomLink = ({ to, children }) => {
    return (
      <Link
        to={to}
        spy={true}
        smooth={true}
        duration={500}
        className="hover:text-blue-600 transition-all cursor-pointer"
      >
        {children}
      </Link>
    );
  };
const Home = () => {
  
  return (
    <div className=" min-h-screen flex flex-row justify-between items-center lg:px-0 px-0 bg-[url('./assets/img/welcome_1.jpg')] bg-cover bg-no-repeat ">
      <div className=" w-full lg:w-2/3 space-y-5">
        <h1 className="text-backgroundColor font-serif font-semibold text-6xl">
        Explorez le Monde des Transactions Immobilières : Réussir vos Achats et Ventes.
        </h1>
        <p className=" text-backgroundColor">
          
        </p>
        
      </div>
    </div>
  );
};

export default Home;