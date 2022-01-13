import React from 'react';
import { Donut } from '@alitajs/charts';
import { px2hd } from '@alitajs/f2';

interface DountProps {
  data: any[];
  type: 'normal' | 'table';
}
const DemoChart: React.FC<DountProps> = () => {
  const data = [
    { rank: 1, name: '华为', percent: '20%', count: 1336 },
    { rank: 2, name: '小米', percent: '18%', count: 1230 },
    { rank: 3, name: 'VIVO', percent: '17%', count: 1102 },
    { rank: 4, name: 'OPPO', percent: '13%', count: 1033 },
    { rank: 5, name: 'IPhone', percent: '9%', count: 1022 },
  ];

  return (
    <>
      <Donut
        data={data}
        type="customTable"
        x="name"
        y="count"
        height={500}
        htmlStr={`<div style="width: ${px2hd(125)}px;text-align: center;">
          <div style="font-size:${px2hd(
            42,
          )};color:#333333;font-weight: bold;word-break: break-all;">可自定义</div>
          <div style="font-size: ${px2hd(12)};color:#999999;">总资产</div>
        </div>`}
        tableHeader={[
          { value: 'rank', title: '排名' },
          { value: 'name', title: '品牌', showDot: true },
          { value: 'percent', title: '占比' },
          { value: 'count', title: '数量' },
        ]}
      />
    </>
  );
};

export default DemoChart;
