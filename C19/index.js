import { select, 
	csv, 
  json, 
  geoPath, 
  geoMercator, 
  scaleSqrt,
  scaleOrdinal,
	extent,
  zoom,
  timeFormat,
	timeParse,
} from 'd3';
import { feature, mesh } from 'topojson';

//SVG
const svg = select('svg');
const svgWidth = +svg.attr('width');
const svgHeight = +svg.attr('height');
const margin = {top: 50, right:50, bottom:50, left:50}
const innerWidth = svgWidth - margin.left - margin.right;
const innerHeight = svgHeight - margin.top - margin.bottom;

//world generator
const projection = geoMercator()
	.center([0,20]);

const pathGenerator = geoPath().projection(projection);
const worldG = svg.append('g')
	.attr('transform', `translate(0,0)`);

worldG.append('path')
  .attr('fill','gray')
  .attr('d', pathGenerator({type:'Sphere'}));

const world = json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json').then(data => {
	const countries = feature(data,data.objects.countries);	
	const paths = worldG.selectAll('path').data(countries.features);
	paths.enter()
    .append('path')
      .attr('d', d => pathGenerator(d))
      .attr('stroke', 'rgb(255,255,255,0.2)');
	
  let datesArray = [];
  
  //Render Covid-19 Cases
  const covidCases = csv('data.csv')
	.then(data => {
    data.forEach(d => {
      datesArray = parseCases(d);
    });
    renderCases(data,datesArray);
	});
});


//Render Covid Cases function
const renderCases = (data,date) =>{
  
  //Scales
  const yearScale = scaleOrdinal()
  const radiusValue = d => d['3/25/20'];
	const radiusScale = scaleSqrt()
    .domain(extent(data, radiusValue))
    .range([1,50]);
  
  worldG.append('g')
    .selectAll('circle')
    .data(data)
      .enter()
        .append('circle')
        .attr('cx', d => projection([d.Long,d.Lat])[0]) 
        .attr('cy', d => projection([d.Long,d.Lat])[1])
        .attr('r', d => radiusScale(radiusValue(d)))
        .attr('fill','orange')
  			.attr('fill-opacity', .4)
  			.attr('stroke', 'rgb(255,255,255,.4');
}
//first date of Covid-19 cases record by Johns Hopkins

const dateSlider = select('#date-slider')
	.on('input', d => {
  	select('#current-date').text('stuff');
  });

const parseCases = d => {
  const keys = Object.keys(d);
  for(let i = 0; i < keys.length; i++){
    if(!isNaN(Date.parse(keys[i]))){
      d[keys[i]] = +d[keys[i]];
      keys[i] = formatDate(keys[i]);
    }	
  }
  d.Long = +d.Long;
  d.Lat = +d.Lat;
	
}
//Change original date format of csv file
const formatDate = date => {
  const parseTime = timeParse('%m/%d/%y');
  const format = timeFormat('%m/%d/%y');
	let newDate = parseTime(date);
  newDate = format(newDate);
  return newDate;
}

           