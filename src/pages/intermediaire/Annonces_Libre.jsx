import React from "react";
import FreeAnnonceTable from "./FreeAnnonceTable";

const Gestion_free_annonces = () => {

  const [currentPage, setCurrentPage] = React.useState(0);
  const [data, setData] = React.useState([]); // State to hold your data

  // Fetch your data using useEffect (simulating an API call)
  React.useEffect(() => {
    // Simulating fetching data from an API
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch("http://localhost:3002/annonces"); // Fetch data from your API
        const jsonData = await response.json(); // Parse JSON response
        setData(jsonData); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  const itemsPerPage = 8; // Define items per page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length); // Limit endIndex to avoid exceeding data length
  const currentPageData = data.slice(startIndex, endIndex);
  

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage); // Update the current page
  };

  return (
    <div className="ml-20 mr-14">
      <div className="sm:ml-2">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* Render your table or content using currentPageData */}
          <FreeAnnonceTable data={currentPageData} />
        </div>
      </div>
    </div>
  );
};

export default Gestion_free_annonces;
