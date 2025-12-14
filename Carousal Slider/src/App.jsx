import { useState } from "react";
import "./App.css";
import Carousel from "./Carousel";
import One from "./assets/1.jpg";
import Two from "./assets/2.jpg";
import Three from "./assets/3.jpg";
import Four from "./assets/4.jpg";
import Five from "./assets/5.jpg";
function App() {
  return (
    <div className="app">
      <Carousel>
        <img src={One} />
        <img src={Two} />
        <img src={Three} />
        <img src={Four} />
        <img src={Five} />
      </Carousel>
    </div>
  );
}

export default App;
