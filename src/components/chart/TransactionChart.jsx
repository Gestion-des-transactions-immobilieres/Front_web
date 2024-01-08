import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TransactionChart = ({ datakey, fill, titre, data_st, champ_x,angle }) => {
  const [annonces_demande_region, setAnnoncesDemandeRegion] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const fetchDataRegion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/annonces/${data_st}?annee=${selectedYear}`
      );
      setAnnoncesDemandeRegion(response.data);
      console.log("imm the one ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataRegion();
  }, [selectedYear]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/annonces/allYears"
        );
        setYears(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };
    fetchYears();
  }, []);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
  };

  console.log("mmmmmmm", annonces_demande_region);

  return (
    <div className="h-[24rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">{titre}</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Sélectionnez une année</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {annonces_demande_region.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={annonces_demande_region}
              margin={{
                top: 20,
                right: 30,
                left: -10,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
              <XAxis dataKey={champ_x} angle={angle} textAnchor="start" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={datakey} fill={fill} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div>Aucune donnée disponible pour l'année sélectionnée</div>
        )}
      </div>
    </div>
  );
};

export default TransactionChart;
