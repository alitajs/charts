import React, { useState } from 'react';
import { Donut } from '@alitajs/charts';

interface DountProps {
  data: any[];
  type: 'normal' | 'table';
}
const DemoChart: React.FC<DountProps> = () => {
  const data = [
    { name: '预警', percent: 2423 },
    { name: '客户', percent: 423 },
    { name: '营销', percent: 1223 },
    { name: '商机', percent: 1423 },
    { name: '合同', percent: 323 },
    { name: '订单', percent: 323 },
    { name: '日常', percent: 323 },
    { name: '服务', percent: 323 },
  ];

  return (
    <>
      <Donut
        data={data}
        type="normal"
        x="name"
        y="percent"
        sumText="333"
        sumTitle="总资产"
        height={500}
      />
    </>
  );
};

export default DemoChart;
