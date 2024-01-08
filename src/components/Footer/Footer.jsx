import React from "react";

const Footer = () => {
  return (
    <div className=" bg-black text-white rounded-t-3xl  m-10">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">TransactionWeb</h1>
          <p className=" text-sm">
          C'est une plateforme qui offre un moyen convivial et sécurisé de rechercher, répertorier et
           conclure des transactions immobilières, simplifiant ainsi le processus d'achat, de vente ou de location de biens immobiliers.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
              
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
             
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
            
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
              
            </a>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
              About
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
              Contact
            </a>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
              belhadaouiachraf@gmail.com
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
              +64 958 248 966
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="#"
            >
              Social media
            </a>
          </nav>
        </div>
      </div>
      <div>
        <p>
          <p className=" text-center py-4">
            @copyright developed by
            <span className=" text-brightColor"> champion programmers</span> |
            All rights reserved
          </p>
        </p>
      </div>
    </div>
  );
};

export default Footer;