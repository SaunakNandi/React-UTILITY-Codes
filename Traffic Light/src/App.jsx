import "./App.css";
import { TrafficLights } from "./components/traffic-lights/traffic-lights";

function App() {
  const trafficLightsData = [
    {
      color: "red",
      time: 4000,
      order: 1,
      displayOrder: 3,
    },
    {
      color: "yellow",
      time: 1000, // 4sec
      order: 3,
      displayOrder: 2,
    },
    {
      color: "green",
      time: 2000, // 4sec
      order: 2,
      displayOrder: 1,
    },
    {
      color: "aqua",
      time: 1000, // 4sec
      order: 5,
      displayOrder: 4,
    },
    {
      color: "purple",
      time: 400, // 4sec
      order: 4,
      displayOrder: 5,
    },
  ];

  return (
    <>
      <TrafficLights trafficLightsData={trafficLightsData} />
    </>
  );
}

export default App;
