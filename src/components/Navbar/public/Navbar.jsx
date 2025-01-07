import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Design/Button";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "./icons/logo.jpg";

const categories = [
  { nom: "Categorie 1", id: "1" },
  { nom: "Categorie 2", id: "2" },
  { nom: "Categorie 3", id: "3" },
  { nom: "Categorie 4", id: "4" },
  { nom: "Categorie 5", id: "5" },
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showPrixOptions, setShowPrixOptions] = useState(false);
  const [showSurfaceOptions, setShowSurfaceOptions] = useState(false);
  const [showOperationOptions, setShowOperationOptions] = useState(false);
  const [showBienOptions, setShowBienOptions] = useState(false);

  const toggleOptions = (optionState, setOptionState) => {
    if (optionState === showPrixOptions) {
      setShowSurfaceOptions(false);
      setShowOperationOptions(false);
      setShowBienOptions(false);
    }
    if (optionState === showSurfaceOptions) {
      setShowPrixOptions(false);
      setShowOperationOptions(false);
      setShowBienOptions(false);
    }
    if (optionState === showOperationOptions) {
      setShowPrixOptions(false);
      setShowSurfaceOptions(false);
      setShowBienOptions(false);
    } else if (optionState === showBienOptions) {
      setShowPrixOptions(false);
      setShowSurfaceOptions(false);
      setShowOperationOptions(false);
    }
    setOptionState(!optionState);
  };

  const handleChange = () => {
    setMenu(!menu);
  };

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

  const OnclickCustomLink = ({ to, onClickHandler, children }) => {
    return (
      <Link
        to={to}
        spy={true}
        smooth={true}
        duration={500}
        className="hover:text-blue-600 transition-all cursor-pointer"
        onClick={onClickHandler}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="  w-full z-20">
      <div>
        <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className=" flex flex-row items-center cursor-pointer ">
            <span>
            <img src={logo} alt="Home Icon" style={{ width: '70px', height: '70px' }} />
            </span>
            <h1 className=" text-xl font-semibold">Digital Transaction</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <SimpleCustomLink to="/home">Home</SimpleCustomLink>
            {/* <SimpleCustomLink to="/annonces">Carte des annonces</SimpleCustomLink> */}

            {/* <div className="relative group">
              <div className="flex items-center gap-1">
                <OnclickCustomLink
                  to="/offres"
               
                >
                  Annonces
                </OnclickCustomLink>
                <BiChevronDown className="cursor-pointer" size={25} />
              </div>

              <ul className="absolute hidden w-40 space-y-2 group-hover:block bg-white border border-gray-300 rounded-lg p-5">
                <li>
                  <OnclickCustomLink
                    to="#"
                    onClickHandler={() =>
                      toggleOptions(showPrixOptions, setShowPrixOptions)
                    }
                  >
                    Prix
                  </OnclickCustomLink>
                </li>
                {showPrixOptions && 
                
                  <ul className="absolute w-40 space-y-2 bg-white border border-gray-300 rounded-lg p-5">
                    {
                      categories.map((categorie)=>(
                        <li>
                      <OnclickCustomLink
                        to={"offres/prix/categorie/"+categorie.id}
                        onClickHandler={() =>
                          toggleOptions(showPrixOptions, setShowPrixOptions)
                        }
                      >
                        {categorie.nom}
                      </OnclickCustomLink>
                    </li>
                      ))
                    }
                  </ul>
                }

                <li>
                  <OnclickCustomLink
                    to="#"
                    onClickHandler={() =>
                      toggleOptions(showSurfaceOptions, setShowSurfaceOptions)
                    }
                  >
                    Surface
                  </OnclickCustomLink>
                </li>
                {showSurfaceOptions && (
                  <ul className="absolute w-40 space-y-2 bg-white border border-gray-300 rounded-lg p-5">
                    <li>
                      <OnclickCustomLink
                        to="offres/surface/C1"
                        onClickHandler={() =>
                          toggleOptions(showSurfaceOptions, setShowSurfaceOptions)
                        }
                      >
                        Categorie 1
                      </OnclickCustomLink>
                    </li>
                    <li>
                      <OnclickCustomLink
                        to="offres/surface/C2"
                        onClickHandler={() =>
                          toggleOptions(showSurfaceOptions, setShowSurfaceOptions)
                        }
                      >
                        Categorie 2
                      </OnclickCustomLink>
                    </li>
                    <li>
                      <OnclickCustomLink
                        to="offres/surface/C3"
                        onClickHandler={() =>
                          toggleOptions(showSurfaceOptions, setShowSurfaceOptions)
                        }
                      >
                        Categorie 3
                      </OnclickCustomLink>
                    </li>
                    <li>
                      <OnclickCustomLink
                        to="offres/surface/C4"
                        onClickHandler={() =>
                          toggleOptions(showSurfaceOptions, setShowSurfaceOptions)
                        }
                      >
                        Categorie 4
                      </OnclickCustomLink>
                    </li>
                    <li>
                      <OnclickCustomLink
                        to="offres/surface/C5"
                        onClickHandler={() =>
                          toggleOptions(showSurfaceOptions, setShowSurfaceOptions)
                        }
                      >
                        Categorie 5
                      </OnclickCustomLink>
                    </li>
                
                  </ul>
                )}
                <li>
                  <OnclickCustomLink
                    to="#"
                    onClickHandler={() =>
                      toggleOptions(showBienOptions, setShowBienOptions)
                    }
                  >
                    Type bien
                  </OnclickCustomLink>
                </li>
                {showBienOptions && (
                  <ul className="absolute w-40 space-y-2 bg-white border border-gray-300 rounded-lg p-5">
                    <li>
                      <OnclickCustomLink
                        to="offres/bien/maison"
                        onClickHandler={() =>
                          toggleOptions(showBienOptions, setShowBienOptions)
                        }
                      >
                        Maison
                      </OnclickCustomLink>
                    </li>
                    <li>
                      <OnclickCustomLink
                        to="offres/bien/villa"
                        onClickHandler={() =>
                          toggleOptions(showBienOptions, setShowBienOptions)
                        }
                      >
                        Villa
                      </OnclickCustomLink>
                    </li>
                    <li>
                      <OnclickCustomLink
                        to="offres/bien/apartement"
                        onClickHandler={() =>
                          toggleOptions(showBienOptions, setShowBienOptions)
                        }
                      >
                        Appartement
                      </OnclickCustomLink>
                    </li>
        
               
                  </ul>
                )}
                   <li>
                  <OnclickCustomLink
                    to="#"
                    onClickHandler={() =>
                      toggleOptions(showOperationOptions, setShowOperationOptions)
                    }
                  >
                    Operation
                  </OnclickCustomLink>
                </li>
                {showOperationOptions && (
                  <ul className="absolute w-40 space-y-2 bg-white border border-gray-300 rounded-lg p-5">
                    <li>
                      <OnclickCustomLink
                        to="offres/operation/vendre"
                        onClickHandler={() =>
                          toggleOptions(showOperationOptions, setShowOperationOptions)
                        }
                      >
                        Vendre
                      </OnclickCustomLink>
                    </li>
                    <li>
                      <OnclickCustomLink
                        to="offres/operation/louer"
                        onClickHandler={() =>
                          toggleOptions(showOperationOptions, setShowOperationOptions)
                        }
                      >
                        Louer
                      </OnclickCustomLink>
                    </li>
               
                  </ul>
                )}
              </ul>
            </div> */}
            <SimpleCustomLink to="/menu">Annonces</SimpleCustomLink>
            <SimpleCustomLink to="/tableau-bord">Tableau de bord</SimpleCustomLink>
            <SimpleCustomLink to="/about">About</SimpleCustomLink>
            <SimpleCustomLink to="/review">Contact</SimpleCustomLink>
            <SimpleCustomLink to="/login">
              <Button title="Login" />
            </SimpleCustomLink>
          </nav>

          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
