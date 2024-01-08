import React , { useEffect } from "react";
import UserTable from "../../tables/UserTable";

const Gestion_intermediaire = () => {

  useEffect(() => {
    const user = localStorage.getItem('ADMIN');
    console.log("imm the admin",user);
    if (!user) {
      localStorage.removeItem('ADMIN');
      window.location.href = '/login'; 
    }
  }, []);

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700  ">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Gestion_intermediaire;
