import { useEffect, useState } from "react";

export const TrafficLights = ({ trafficLightsData }) => {
  const dataToShow = getsorted(trafficLightsData, "displayOrder");
  const dataInOrder = getsorted(trafficLightsData, "order");

  const [activeLight, setActiveLights] = useState(dataInOrder[0]);

  function getsorted(randomOrder, type) {
    return randomOrder.toSorted((a, b) => {
      return a[type] - b[type];
    });
  }

  useEffect(() => {
    setTimeout(() => {
      const currentColorIndex = dataInOrder.findIndex((item) => {
        return item.color === activeLight.color;
      });
      const nextIndex = currentColorIndex + 1;
      setActiveLights(dataInOrder[nextIndex] ?? dataInOrder[0]);
    }, 3000);
  }, [activeLight]);
  return (
    <>
      <div className="traffic-light">
        {dataToShow.map((item) => (
          <Light
            key={item.color}
            color={item.color}
            activeLightColor={activeLight.color}
          />
        ))}
      </div>
    </>
  );
};

export const Light = ({ color, activeLightColor }) => {
  return (
    <div
      className="light"
      style={{
        backgroundColor: color,
        opacity: color === activeLightColor ? 1 : "0.2",
      }}
    />
  );
};
