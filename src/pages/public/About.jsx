import React from "react";
import img from "/assets/img/HomeFamilly.jpg";
import Button from "../../components/Design/Button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5">
      <img src={img} alt="img" />

      <div className=" space-y-4 lg:pt-14 m-16">
        <h1 className=" font-semibold text-4xl text-center md:text-start">
          Why Choose Us?
        </h1>
        <p>
        Notre application de gestion des transactions immobilières est bien plus qu'une simple plateforme.
         C'est un partenaire de confiance dans votre parcours immobilier. Nous simplifions le processus d'achat
          ou de vente de biens immobiliers, offrant une expérience fluide, sécurisée et transparente. 
          Grâce à notre vaste réseau d'annonces, vous trouverez toujours la propriété de vos rêves. 
          Notre équipe dévouée est prête à vous offrir une assistance personnalisée à chaque étape, garantissant votre satisfaction.
           De plus, nous intégrons les dernières innovations technologiques, des visites virtuelles à la signature électronique,
            pour vous offrir une solution de gestion immobilière complète. Rejoignez
         notre communauté de clients satisfaits et choisissez la tranquillité d'esprit pour toutes vos transactions immobilières.
        </p>
        <p>
        Notre plateforme se distingue par son engagement envers l'excellence du service client. 
        Nous comprenons que l'achat ou la vente d'une propriété est une étape cruciale de la vie, 
        et c'est pourquoi nous mettons un point d'honneur à écouter vos besoins, à répondre à vos 
        questions et à vous accompagner tout au long du processus. Avec notre expertise, vous pouvez
         envisager votre transaction immobilière en toute sérénité,
         sachant que nous sommes là pour vous, prêts à transformer vos rêves immobiliers en réalité.
        </p>
        <div className=" flex justify-center lg:justify-start">
          <Button title="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default About;