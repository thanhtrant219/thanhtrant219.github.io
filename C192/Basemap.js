//import TileLayer from 'ol/layer/Tile'; 
//import Stamen from 'ol/source/Stamen'; 
const TileLayer = ol.layer.Tile;
const Stamen = ol.source.Stamen;

export const Basemap = new TileLayer({ 
  className: 'basemap',        
  source: new Stamen({         
    layer: 'toner-lite'        
  })
}); 