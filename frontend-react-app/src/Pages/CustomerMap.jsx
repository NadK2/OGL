import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icon issues with React Leaflet & Webpack
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadowUrl,
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
});

L.Marker.prototype.options.icon = defaultIcon;


function CustomerMap() {
    const [customers, setCustomers] = useState([]);
    const [coordinates, setCoordindates] = useState({});
    const [filterString, setFilterString] = useState('');

    /**
     * I normally use google maps but used leaflet maps for simplicity.
     * 
     * @param {*} postcode 
     * @returns 
     */
    async function getCoordinates(postcode) {

        if (!postcode) return;

        const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
        const data = await res.json();
        if (data.status === 200) {
            setCoordindates(prev => ({
                ...prev,
                [postcode]: [data.result.latitude, data.result.longitude]
            }));
        } else {
            throw new Error('Postcode not found');
        }
    }

    const fetchCustomers = () => {
        fetch('http://localhost:8080/customer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    useEffect(() => {
        // loop customer and fetch coordinate data.
        customers.forEach(customer => getCoordinates(customer.postcode));

    }, [customers])


    return (
        <>
            <input placeholder='Search postcode' className='mt-2 mb-2' onChange={e => setFilterString(e.target.value)} />
            <MapContainer center={[52.4862, -1.8904]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {customers.filter(c => String(c.postcode).toLowerCase().includes(filterString.toLowerCase())).map(customer => {

                    if (!coordinates.hasOwnProperty(customer.postcode)) return null;

                    return (
                        <Marker key={customer.id} position={coordinates[customer.postcode]}>
                            <Popup><b>{customer.name}</b><br />{[customer.street, customer.city, customer.county, customer.postcode].filter(Boolean).join(', ')}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </>
    );
}

export default CustomerMap;
