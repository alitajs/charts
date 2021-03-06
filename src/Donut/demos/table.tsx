import React, { useState } from 'react';
import { Donut } from '@alitajs/charts';

interface DountProps {
  data: any[];
  type: 'normal' | 'table';
}
const DemoChart: React.FC<DountProps> = () => {
  const data = [
    { name: '余额', percent: 2423 },
    { name: '理财产品', percent: 423 },
    { name: '黄金', percent: 1223 },
    { name: '余额宝', percent: 1423 },
    { name: '基金', percent: 323 },
  ];

  return (
    <>
      <Donut
        data={data}
        type="table"
        x="name"
        y="percent"
        sumText="5782.70"
        sumTitle="总资产"
        tableHeader={['分类', '占比', '金额']}
        height={500}
      />
    </>
  );
};

export default DemoChart;
