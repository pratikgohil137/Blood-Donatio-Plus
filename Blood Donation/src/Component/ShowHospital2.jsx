import React, { useEffect, useState } from "react";
import HospitalData from "../assets/HospitalData.json"; // Import JSON file
import { IoLocationSharp } from "react-icons/io5";

const ShowHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // Controls how many hospitals to show
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    setHospitals(HospitalData.hospitals);
    setFilteredHospitals(HospitalData.hospitals);

    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  // Update districts when state changes
  useEffect(() => {
    if (selectedState) {
      const filteredDistricts = [...new Set(hospitals
        .filter(hospital => hospital.state === selectedState)
        .map(hospital => hospital.district)
      )];
      setDistricts(filteredDistricts);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict(""); // Reset district selection when state changes
  }, [selectedState, hospitals]);

  // Filter hospitals dynamically
  useEffect(() => {
    let filtered = hospitals;
    if (selectedState) {
      filtered = filtered.filter(hospital => hospital.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(hospital => hospital.district === selectedDistrict);
    }
    setFilteredHospitals(filtered);
    setVisibleCount(10); // Reset the visible count when filters change
  }, [selectedState, selectedDistrict, hospitals]);

  return (
    <div>
      <h2 className="container">Blood Donation Hospitals</h2>

      {/* Filter Dropdowns */}
      <div className="filters">
        <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
          <option value="">Select State</option>
          {[...new Set(hospitals.map(hospital => hospital.state))].map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict} disabled={!selectedState}>
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="hospital-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>District</th>
            <th style={{ textAlign: "center" }}>State</th>
            <th style={{ textAlign: "center" }}>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitals.slice(0, visibleCount).map((hospital, index) => (
            <tr key={index}>
              <td>{hospital.name}</td>
              <td>{hospital.phone}</td>
              <td>{hospital.address}</td>
              <td>{hospital.district}</td>
              <td>{hospital.state}</td>
              <td>
                {userLocation.latitude && userLocation.longitude ? (
                  <a
                    href={`https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/Sir+Takhtasinhji+General+Hospital,+Jail+Rd,+Kalanala,+Panwadi,+Bhavnagar,+Gujarat+364002/data=!3m1!4b1!4m17!1m7!3m6!1s0x395f5a7f7eaebf19:0x159067caff4690bf!2sSir+Takhtasinhji+General+Hospital!8m2!3d21.7673876!4d72.1423563!16s%2Fg%2F1th55d1w!4m8!1m1!4e1!1m5!1m1!1s0x395f5a7f7eaebf19:0x159067caff4690bf!2m2!1d72.1423563!2d21.7673876?entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoASAFQAw%3D%3D`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLocationSharp />
                  </a>
                ) : (
                  "Fetching location..."
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Read More Button */}
      {filteredHospitals.length > visibleCount && (
        <button className="read-more-btn" onClick={() => setVisibleCount(visibleCount + 10)}>
          Show More
        </button>
      )}

      {/* Show Less Button */}
      {visibleCount > 10 && (
        <button className="read-more-btn" onClick={() => setVisibleCount(10)}>
          Show Less
        </button>
      )}
    </div>
  );
};

export default ShowHospital;
