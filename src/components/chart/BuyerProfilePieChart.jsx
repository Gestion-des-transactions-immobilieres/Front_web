import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const BuyerProfilePieChart = () => {
  const [type_bien, setTypeBien] = useState([]);

  const fetchTypeBienData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/annonces/Nb_typeDeBien`
      );
      setTypeBien(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTypeBienData();
  }, []);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

  const total = type_bien.reduce((acc, entry) => acc + entry.nombre, 0);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const percentage = ((type_bien[index].nombre / total) * 100).toFixed(0);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="#333"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${percentage}%`}
        </text>
        <path
          d={`M${x},${y}L${cx},${cy}`}
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={2}
        />
      </g>
    );
  };

  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col ">
      <strong className="text-gray-700 font-medium">Type de bien</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={type_bien}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="nombre"
            >
              {type_bien.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              payload={type_bien.map((entry, index) => ({
                value: entry.type_bien,
                type: "square",
                id: entry.type_bien,
                color: COLORS[index % COLORS.length],
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BuyerProfilePieChart;
