import React from "react";

const Footer = () => {
  return (
    <div className="bg-blue-700 text-white rounded-t-3xl m-10">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className="w-full md:w-1/4">
          <h1 className="font-semibold text-xl pb-4">Description</h1>
          <p className="text-sm">
          Notre plateforme propose une solution intuitive et sécurisée pour explorer, publier et finaliser des transactions immobilières. Elle facilite chaque étape du processus, qu'il s'agisse d'acheter, de vendre ou de louer des biens, en offrant une expérience fluide et accessible à tous.
          </p>
        </div>
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              Home
            </a>
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              Services
            </a>
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              Blog
            </a>
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              FAQ
            </a>
          </nav>
        </div>
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              About
            </a>
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              Contact
            </a>
          </nav>
        </div>
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              aymanhach21@gmail.com<br></br>
              nadia.akhdach@gmail.com
            </a>
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              +212 697-588347
            </a>
            <a
              className="hover:text-blue-300 transition-all cursor-pointer"
              href="#"
            >
              
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
