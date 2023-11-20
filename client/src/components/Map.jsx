import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function Map( {jobs}) {
    const [markers, setMarkers] = useState([]);

    // Function to geocode addresses and update markers
    const geocodeAddresses = async (addresses) => {
        const geocodePromises = addresses.map(async (address) => {
            try {
                const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address.location)}&lang=en&limit=10&type=city&apiKey=13aed61a996b4edc8d7e375b9c6d6a81
                `);
                
                const data = await response.json();

                if (data.features && data.features.length > 0) {
                    const { lat, lon } = data.features[0].properties;
                    return { address, position: [lat, lon] };
                }
            } catch (error) {
                console.error(`Error geocoding address '${address.location}':`, error.message);
            }
        });

        const resolvedMarkers = await Promise.all(geocodePromises);
        setMarkers(resolvedMarkers.filter((marker) => marker !== null));
    };

    const addresses = jobs.map(job => ({ location: job.location, title: job.jobTitle}))
    console.log(addresses)


    useEffect(() => {
        geocodeAddresses(addresses);
    }, []);

    return (
        <div>
            <MapContainer center={[34.0469, -114.732]} zoom={8}>
                <TileLayer
                    attribution='© OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {/* Render markers based on the positions in the markers array */}
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker?.position || [0, 0]}>
                        <Popup>{marker?.address.title || 'Unknown Address'}</Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    );
}

export default Map;



