import React, { useState } from 'react';
import { Donut } from '@alitajs/charts';
import { px2hd } from '@alitajs/f2';

const DemoChart = () => {
  const data = [
    {
      x: '1',
      y: 85,
    },
  ];

  return (
    <>
      <Donut
        data={data}
        type="progress"
        x="x"
        y="y"
        htmlStr={`<div style="width: ${px2hd(168)}px;text-align: center;">
        <div style="font-size:${px2hd(
          64,
        )}px;color:#0056F7;font-weight: bold;word-break: break-all;">20%</div>
        <div style="font-size:${px2hd(30)}px;color:#0056F7;">机完成环比</div>
      </div>`}
        height={500}
        size={20}
        xTakeY
        colDefs={{
          y: {
            max: 100,
            min: 0,
          },
        }}
        geometryProps={{
          color: 'l(90) 0:#00B7BF 1:#77DDC9',
        }}
      />
    </>
  );
};

export default DemoChart;
