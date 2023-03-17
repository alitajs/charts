import React, { FC } from 'react';
import {
  Chart,
  Geometry,
  Tooltip,
  Legend,
  Coordinate,
  // Axis,
  Guide,
  px2hd,
  PieLabel,
  F2,
} from '@alitajs/f2';

const TableLegend: FC<any> = props => {
  const { x, y, total } = props;
  return (
    <PieLabel
      {...props}
      inflectionOffset={20}
      sidePadding={15}
      label1={function label1(data) {
        const text = !isNaN(Number(data[x]))
          ? `${data[x]}/${((parseInt(data[x], 10) / total) * 100).toFixed(0)}%`
          : data[x];
        return {
          text,
          fill: '#808080',
          fontSize: px2hd(22),
        };
      }}
      label2={function label2(data) {
        const text = !isNaN(Number(data[y]))
          ? `${data[y]}/${((parseInt(data[y], 10) / total) * 100).toFixed(0)}%`
          : data[y];
        return {
          fill: '#000000',
          text,
          fontWeight: px2hd(500),
          fontSize: px2hd(20),
        };
      }}
    />
  );
};

export default TableLegend;
