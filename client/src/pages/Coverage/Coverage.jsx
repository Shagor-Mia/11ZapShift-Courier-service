import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef();
  // console.log(serviceCenters);

  const handleSearchLocation = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      // console.log(coord, district);
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="my-20 space-y-10">
      <h1 className="text-center text-5xl font-bold ">
        We are open 64 districts
      </h1>
      {/* search */}
      <div className=" flex items-center justify-center">
        <form onSubmit={handleSearchLocation}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              className="grow"
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      {/*  */}
      <div className="border max-w-6xl mx-auto w-full h-[500px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[500px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
