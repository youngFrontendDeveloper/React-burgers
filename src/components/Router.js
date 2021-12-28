import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/restaurant/:restaurantsId" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
