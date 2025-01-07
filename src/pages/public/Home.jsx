import React from "react";
import Button from "../../components/Design/Button";

const Home = () => {
  return (
    <div className=" min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/img/welcome_1.jpg')] bg-cover bg-no-repeat ">
      <div className=" w-full lg:w-2/3 space-y-5">
        <h1 className="text-backgroundColor font-serif font-semibold text-6xl">
        Explorez le Monde des Transactions Immobilières : Réussir vos Achats et Ventes.
        </h1>
        <p className=" text-backgroundColor">
          
        </p>
        <div className=" lg:pl-44">
          <Button title="Order Now" />
        </div>
      </div>
    </div>
  );
};

export default Home;