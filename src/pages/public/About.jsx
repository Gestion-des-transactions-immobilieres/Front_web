import React from "react";
import img from "/assets/img/HomeFamilly.jpg";
import Button from "../../components/Design/Button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:px-32 px-5 gap-8">
      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center">
        <img
          src={img}
          alt="Home Family"
          className="rounded-lg shadow-lg max-w-full h-auto object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="lg:w-1/2 w-full space-y-6">
        <h1 className="font-semibold text-4xl text-center lg:text-start">
          Pourquoi nous choisir
        </h1>
        <p className="text-gray-700 text-justify leading-relaxed">
        Notre application simplifie et sécurise vos transactions immobilières grâce à une expérience fluide et transparente. Avec un vaste réseau d'annonces, des outils innovants comme les visites virtuelles et la signature électronique, ainsi qu'une assistance personnalisée, nous vous accompagnons à chaque étape pour concrétiser vos projets immobiliers en toute sérénité.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Button title="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default About;
