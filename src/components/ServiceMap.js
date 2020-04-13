import React, { useContext, useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import needIconUrl from '../icons/icon-need.png';
import offerIconUrl from '../icons/icon-offer.png';
import MapContext from '../context';
import './ServiceMap.css';

const icons = {
  need: L.icon({
    iconUrl: needIconUrl,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
  }),
  offer: L.icon({
    iconUrl: offerIconUrl,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
  })
};

const BOG = { latitude: 4.6097102, longitude: -74.081749 };

const ServiceMap = () => {
  const { state } = useContext(MapContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const services = state.services.filter(service => {
      const matchCategory = state.selectedCategory
        ? service.category_slug === state.selectedCategory
        : true;
      const matchAction = state.selectedAction
        ? service.action === state.selectedAction
        : true;
      return matchCategory && matchAction;
    });
    setServices(services);
  }, [state.selectedCategory, state.selectedAction, state.services]);

  const getPosition = service => {
    const latitude = +service.latitude || BOG.latitude;
    const longitude = +service.longitude || BOG.longitude;
    return [latitude, longitude];
  };

  return (
    <Map center={[4.6097102, -74.081749]} zoom={11}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      {services.map(service => (
        <Marker
          key={service.id}
          position={getPosition(service)}
          icon={icons[service.action]}
        >
          <Popup>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href={service.url} target="_blank" rel="noopener noreferrer">
              Ver más
            </a>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default ServiceMap;
