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
        type="custom"
        x="name"
        y="count"
        height={500}
        htmlStr={`<div style="width: ${px2hd(125)}px;text-align: center;">
          <div style="font-size:${px2hd(
            42,
          )};color:#333333;font-weight: bold;word-break: break-all;">可自定义</div>
          <div style="font-size: ${px2hd(12)};color:#999999;">总资产</div>
        </div>`}
        renderLegend={({ item, color }, showSelectShapeCallback) => {
          return (
            <div
              onClick={showSelectShapeCallback}
              style={{
                width: '50%',
                textAlign: 'center',
                display: 'inline-block',
                height: '0.6rem',
                lineHeight: '0.6rem',
                fontSize: '0.24rem',
                color: '#333',
              }}
            >
              <span
                style={{
                  backgroundColor: color,
                  width: '0.2rem',
                  height: '0.2rem',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '0.1rem',
                }}
              ></span>
              {[item.name, item.percent, item.count]}
            </div>
          );
        }}
      />
    </>
  );
};

export default DemoChart;
