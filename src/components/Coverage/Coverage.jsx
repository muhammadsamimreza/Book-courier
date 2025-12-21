import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper component to fly to searched location
const FlyToLocation = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 14);
  }, [center]);
  return null;
};

const Coverage = () => {
  const defaultPosition = [23.685, 90.3563]; // center of Bangladesh
  const [serviceCenters, setServiceCenters] = useState([]);
  const [flyTo, setFlyTo] = useState(null);

  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/serviceCenter.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      setFlyTo([district.latitude, district.longitude]);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center">We are in 64 Districts</h1>
      </div>

      <div className="flex justify-center mt-10">
        <form onSubmit={handleSearch}>
          <div className="join">
            <input
              type="search"
              placeholder="Search"
              name="location"
              className="input join-item"
            />
            <button className="btn btn-neutral join-item">Search</button>
          </div>
        </form>
      </div>

      <div className="border w-[80%] mx-auto h-[550px] my-10">
        <MapContainer
          center={defaultPosition}
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong> <br />
                Cover Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}

          {/* Fly to searched location */}
          {flyTo && <FlyToLocation center={flyTo} />}
        </MapContainer>
      </div>
    </>
  );
};

export default Coverage;
