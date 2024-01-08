import React , { useEffect } from "react";
import BienTable from "../../tables/BienTable";


const Gestion_biens = () => {

  
  useEffect(() => {
    const user = localStorage.getItem('ADMIN');
    if (!user) {
      localStorage.removeItem('ADMIN');
      window.location.href = '/login'; 
    }
  }, []);
  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700  ">
          <BienTable />
        </div>
      </div>
    </div>
  );
};

export default Gestion_biens;
