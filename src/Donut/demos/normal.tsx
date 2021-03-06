import React from 'react';
import { Donut } from '@alitajs/charts';
import { px2hd } from '@alitajs/f2';

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
        height={500}
        htmlStr={`<div style="width: ${px2hd(125)}px;text-align: center;">
          <div style="font-size:${px2hd(
            42,
          )};color:#333333;font-weight: bold;word-break: break-all;">可自定义</div>
          <div style="font-size: ${px2hd(12)};color:#999999;">总资产</div>
        </div>`}
      />
    </>
  );
};

export default DemoChart;
