import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout/AdminLayout";
import IntermediaireLayout from "./components/layout/IntermediaireLayout/IntermediaireLayout";
import PublicLayout from "./components/layout/PublicLayout/PublicLayout";
import { ConfigProvider, theme } from "antd";
import { ContextProvider } from "./context/ContextProvider";



const App = () => {
  return (
<ContextProvider>
    <ConfigProvider>
      <div className={`h-screen w-screen`}>
        <Routes>
          <Route path="/*" element={<PublicLayout etat="public" />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/intermediaire/*" element={<IntermediaireLayout etat="inter"/>} />
        </Routes>
      </div>
    </ConfigProvider>
  </ContextProvider>
  );
};

export default App;
