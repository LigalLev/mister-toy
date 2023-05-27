import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { StoreMapCard } from "./store-map-card";
import { Button } from "@mui/material";


export function StoresLocationMap() {
  const [center, setCenter] = useState({ lat: 32.437408, lng: 34.925621 })
  const zoom = 9
  const branches = [{
    city: 'Haifa',
    id: 101,
    position: {
      lat: 32.794,
      lng: 34.9896
    },
    address: 'Hertzel st. 1020',
    phone: '972-4-294836'
  },
  {
    city: 'Hadera',
    id: 102,
    position: {
      lat: 32.437408,
      lng: 34.925621
    },
    address: 'Havatzelet 1',
    phone: '972-4-492736'
  },
  {
    city: 'Tel Aviv',
    id: 103,
    position: {
      lat: 32.085300,
      lng: 34.781769
    },
    address: 'HaShikma 34',
    phone: '972-3-402736'
  },
  ]

  function handleChange({ lat, lng }) {


  }

  return (
    <div>
      {branches.map(branch => {
        return <Button key={branch.city} onClick={() => setCenter(branch.position)}>{branch.city}</Button>
      })}

      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCDBCTxxCGiQTREGaL_dbFDbYKu2CBUhwA" }}
          defaultCenter={center}
          center={center}
          defaultZoom={zoom}
          onClick={handleChange}
        >
          {branches.map(branch => {
            return <StoreMapCard
              lat={branch.position.lat}
              lng={branch.position.lng}
              address={branch.address}
              phone={branch.phone}
              city={branch.city}
              key={branch.id}

            />
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
}