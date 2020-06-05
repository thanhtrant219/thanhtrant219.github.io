import React, { useRef, useEffect, useState } from 'react';
import { Basemap } from './Basemap';
import { generateSprite } from './generateSprite';
const { Map, View, source, layer, format, style } = ol;
const VectorLayer = layer.Vector;
const VectorSource = source.Vector;
const GeoJSON = format.GeoJSON;
const { Icon, Style } = style;

const iconStyle = (canvas, scale) => {
  const { width, height } = canvas;
  return new Style({
    image: new Icon({
      img: canvas,
      imgSize: [width, height],
      scale
    })
  });
};

const mapZoom = {
  zoom: 1.9068905956085187,
  center: [831533.7387061372, 1156963.888662201]
};

const useMapAndView = ({ ref }) => {
  const [mapAndView, setMapAndView] = useState();

  useEffect(() => {
    const { zoom, center } = mapZoom;

    const view = new View({ center, zoom });
    const map = new Map({
      target: ref.current,
      layers: [Basemap],
      view
    });

    setMapAndView({ map, view });
    // Free up map resources when destroying the component.
    // Draws from https://stackoverflow.com/questions/25995334/deconstructing-an-open-layers-3-map
    return () => {
      map.setTarget(null);
    };
  }, []);
  return mapAndView;
};

const useSpriteLayer = ({ mapAndView, data }) => {
  useEffect(() => {
    if (!mapAndView || !data) return;
    const { map } = mapAndView;
    const source = new VectorSource({});

    const geoJSON = {
      type: 'FeatureCollection',
      features: data.map(d => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [d.lng, d.lat]
        }
      }))
    };
    source.addFeatures(
      new GeoJSON().readFeatures(geoJSON, { featureProjection: 'EPSG:3857' })
    );
    const canvas = generateSprite('rgb(0,200,150)', 0.4);
    const style = iconStyle(canvas, 0.6);
    const layer = new VectorLayer({ source, style });
    map.addLayer(layer);
    return () => map.removeLayer(layer);
  }, [mapAndView, data]);
};

export const Cartography = ({ data }) => {
  const ref = useRef(null);
  const mapAndView = useMapAndView({ ref });
  useSpriteLayer({ mapAndView, data });
  return <div style={{ flex: 1 }} ref={ref} />;
};
