import React from "react";
import AddVhicleForm from "./Components/AddVhicleForm";
import ViewVehicle from "./Components/ViewVehicle";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddVhicleForm />}></Route>
          <Route path="viewvehicle" element={<ViewVehicle />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <div>
    <AddVhicleForm />
    </div> */}
    </>
  );
};

export default App;
