import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/e1c41f13e907e3828fb40cb542148b6430426199/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

const row = d => {
  d.lat = +d.Lat;
  d.lng = +d.Long;
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(rawData => {
      const columns = rawData.columns
      const mostRecentDate = columns[columns.length - 1];
      console.log('Showing data for ' + mostRecentDate)
      setData(rawData.filter(d => d[mostRecentDate] !== "0"))
    });
  }, []);

  return data;
};
