import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Delivery cities (Bangladesh example – you can change)
const deliveryCities = [
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Chattogram", lat: 22.3569, lng: 91.7832 },
  { name: "Rajshahi", lat: 24.3745, lng: 88.6042 },
  { name: "Khulna", lat: 22.8456, lng: 89.5403 },
  { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
  { name: "Rangpur", lat: 25.7439, lng: 89.2752 },
];

const CoverageSection = () => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-6">
        🚚 Delivery Coverage
      </h2>

      <p className="text-center text-gray-500 mb-8">
        We currently deliver books to the following cities
      </p>

      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={6}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {deliveryCities.map((city, index) => (
            <Marker key={index} position={[city.lat, city.lng]}>
              <Popup>
                📍 <strong>{city.name}</strong> <br />
                Delivery Available
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default CoverageSection;
