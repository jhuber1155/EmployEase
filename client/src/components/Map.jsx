import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet"

function Map() {
  return (
    <div>
        <MapContainer center={[48.8566, 2.3522]} zoom={13}>
              <TileLayer
                attribution='© OpenStreetMap contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </MapContainer>
    </div>
  )
}

export default Map