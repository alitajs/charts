import React, { useState } from 'react';
import { Donut } from '@alitajs/charts';

interface DountProps {
  data: any[];
  type: 'normal' | 'table';
}
const DemoChart: React.FC<DountProps> = () => {
  const data = [
    {
      name: '余额',
      percent: 2423.0,
    },
    {
      name: '理财产品',
      percent: 423.0,
    },
    {
      name: '黄金',
      percent: 1223.0,
    },
    {
      name: '余额宝',
      percent: 1423.0,
    },
    {
      name: '基金',
      percent: 323.0,
    },
  ];

  return (
    <>
      <Donut
        data={data}
        type="normal"
        x="name"
        y="percent"
        sumText="5782.70"
        sumTitle="总资产"
      />
    </>
  );
};

export default DemoChart;
