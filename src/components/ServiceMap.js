import React, { useContext, useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MapContext from '../context';

const ServiceMap = () => {
  const { state } = useContext(MapContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const services = state.services.filter(
      service => service.category_slug === state.selected
    );
    setServices(services);
  }, [state.selected, state.services]);

  return (
    <Map center={[4.6097102, -74.081749]} zoom={10}>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {services.map(service => (
        <Marker
          key={service.id}
          position={[service.latitude, service.longitude]}
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
