import React , { useEffect } from "react";
import OperationTable from "../../tables/OperationTable";

const Gestion_operations = () => {

  
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
          <OperationTable />
        </div>
      </div>
    </div>
  );
};

export default Gestion_operations;
