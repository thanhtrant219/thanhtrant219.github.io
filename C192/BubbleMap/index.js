import React from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

const sizeValue = d => d['Total Dead and Missing'];

export const BubbleMap = ({ data, worldAtlas }) => {
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={data}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
