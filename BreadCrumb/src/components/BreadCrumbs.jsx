import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumbs() {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/").filter((x) => x != "");
  console.log("pathArray => ", pathArray);
  let breadcrumb = "";
  return (
    <div>
      {pathArray.length === 0 ? <></> : <Link to="/">/ Home</Link>}
      {pathArray.map((name, i) => {
        breadcrumb += `/${name}`;
        return i === pathArray.length - 1 ? (
          <span key={i}>/ {name}</span>
        ) : (
          <Link to={breadcrumb} key={i}>
            / {name}
          </Link>
        );
      })}
    </div>
  );
}
