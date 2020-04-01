import React, { useContext, useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import needIconUrl from '../icons/icon-need.png';
import offerIconUrl from '../icons/icon-offer.png';
import MapContext from '../context';

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

const ServiceMap = () => {
  const { state } = useContext(MapContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!state.selected) {
      setServices(state.services);
      return;
    }
    const services = state.services.filter(
      service => service.category_slug === state.selected
    );
    setServices(services);
  }, [state.selected, state.services]);

  return (
    <Map center={[4.6097102, -74.081749]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {services.map(service => (
        <Marker
          key={service.id}
          position={[service.latitude, service.longitude]}
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
