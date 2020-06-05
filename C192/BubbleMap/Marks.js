import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const [tX, tY] = projection([52.9399,	-73.5491].reverse());
console.log(tX, tY)

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue
}) => (
  <g className="marks">
    <path className="sphere" d={path({ type: 'Sphere' })} />
    <path className="graticules" d={path(graticule())} />
    {land.features.map(feature => (
      <path className="land" d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    {data.map(d => {

      const [x, y] = projection(d.coords);
      return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
    })}
    <circle cx={+tX} cy={+tY} r="100" />
  </g>
);
