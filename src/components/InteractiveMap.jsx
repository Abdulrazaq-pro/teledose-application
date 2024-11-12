"use client";
import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldGeoJSON from "./worldGeoJSON"; // GeoJSON file for world map
import countryData from "../data/countryData"; // Import the country-specific data

const InteractiveMap = ({ selectedCountry, setSelectedCountry }) => {
  const onEachCountry = (country, layer) => {
    const countryName = country.properties.name;

    layer.on("mouseover", () => {
      layer.setStyle({ fillOpacity: 0.7 });
    });
    layer.on("mouseout", () => {
      layer.setStyle({ fillOpacity: 0.5 });
    });

    layer.on("click", () => {
      console.log("Country clicked:", countryName);

      if (countryName) {
        const data =
          countryData[countryName] ||
          countryData[
            Object.keys(countryData).find(
              (key) => key && key.toLowerCase() === countryName.toLowerCase()
            )
          ];

        const countryInfo = data
          ? { name: countryName, ...data }
          : {
              name: countryName,
              healthStats: "Data not available",
              aiInfo: "Data not available",
            };

        setSelectedCountry(countryInfo);
      } else {
        setSelectedCountry({
          name: "Unknown Country",
          healthStats: "Data not available",
          aiInfo: "Data not available",
        });
      }
    });
  };

  return (
    <MapContainer
      className="h-[80vh] w-full rounded-lg shadow-md"
      zoom={2}
      center={[20, 0]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={worldGeoJSON} onEachFeature={onEachCountry} />
    </MapContainer>
  );
};

export default InteractiveMap;
