import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 flex gap-6 justify-end w-full py-3 px-12 z-40 bg-blue-600 dark:bg-blue-900 border-b-[1px] border-blue-300 dark:border-blue-800"
      >
        {/* Icone de recherche */}
        <BsSearch
          className="fill-blue-100 w-[34px] h-[34px] p-[6px] rounded-full border-2 overflow-visible border-blue-300 dark:border-blue-800 hover:bg-blue-500 hover:fill-white transition duration-200"
        />

        {/* Image de profil */}
        <img
          src="https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=UOMXfynJ2FEiVw&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2ff%2fa%2f0%2fc%2f1434020125875430376profile.png&ehk=73x7A%2fh2HgYZLT1q7b6vWMXl86IjYeDhub59EZ8hF14%3d&risl=&pid=ImgRaw&r=0"
          alt="Profil"
          className="w-[34px] h-[34px] rounded-full border-2 border-blue-300 dark:border-blue-800 hover:scale-105 transition duration-200"
        />
      </nav>
    </>
  );
};

export default Navbar;
