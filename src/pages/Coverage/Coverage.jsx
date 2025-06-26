import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import L from "leaflet";

// Example custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

// Helper component to control map center
function FlyToDistrict({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 10); // Zoom level 10
  }
  return null;
}

export default function Coverage() {
  const warehouses = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState("");

  // Search handler
  const handleSearch = () => {
    const found = warehouses.find((item) =>
      item.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (found) {
      setSelectedPosition([found.latitude, found.longitude]);
      setActiveDistrict(found.district);
    } else {
      alert("District not found");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-6 space-y-6">
      
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        We are available in <span className="text-primary">64 districts</span>
      </h1>

      {/* Search Box */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-64"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary text-black" onClick={handleSearch}>
          Search
        </button>
      </div>
      
      {/* Map Container */}
      <div className="w-full max-w-6xl h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={[23.685, 90.3563]} zoom={7} className="h-full w-full">
          
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Re-center map when a district is selected */}
          {selectedPosition && <FlyToDistrict position={selectedPosition} />}

          {/* Markers */}
          {warehouses.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              icon={customIcon}
            >
              <Popup autoOpen={center.district === activeDistrict}>
                <strong>{center.district}</strong> <br />
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
