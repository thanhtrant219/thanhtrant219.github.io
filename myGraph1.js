(function (d3, topojson) {
  'use strict';

  const svg = d3.select('svg');

  const projection = d3.geoOrthographic();
  const pathGenerator = d3.geoPath().projection(projection);

  Promise.all([
    d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  ]).then(([tsvData, topoJSONdata]) => {
    const countryName = tsvData.reduce((accumulator,d) => {
      accumulator[d.iso_n3] = d.name;
      return accumulator;
    },{});
      
      const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
      svg.selectAll('path').data(countries.features)
        .enter().append('path')
          .attr('class', 'country')
          .attr('d', pathGenerator)
    			.append('title')
    					.text(d => countryName[d.id]);
    });

}(d3, topojson));