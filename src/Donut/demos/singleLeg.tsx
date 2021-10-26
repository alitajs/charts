import React, { useState } from 'react';
import { Donut } from '@alitajs/charts';
import { px2hd } from '@alitajs/f2';

interface DountProps {
  data: any[];
  type: 'normal' | 'table';
}
const DemoChart: React.FC<DountProps> = () => {
  const data = [
    { name: '本网用户', percent: 340 },
    { name: '异网用户', percent: 240 },
    { name: '商户客户', percent: 260 },
    { name: '无归属客户', percent: 160 },
  ];
  const [selectObj, setlectObj] = useState({
    text: '总数量',
    num: 1000,
  });

  const onLegendEndClick = (selectItem: any) => {
    const { name, value } = selectItem._attrs || {};
    console.log(selectItem);
    const text = document.querySelector('#text');
    const num = document.querySelector('#num');
    text.innerHTML = name;
    num.innerHTML = `${(value / 1000) * 100}%`;
    // const { name, value } = selectItem;
    // setlectObj({
    //   text: name,
    //   num: value / 1000 * 100,
    // })
  };
  return (
    <>
      <Donut
        data={data}
        type="singleLeg"
        x="name"
        y="percent"
        height={500}
        drawLabelFlag={false}
        htmlStr={`<div style="width: ${px2hd(125)}px;text-align: center;">
          <div style="font-size:${px2hd(
            42,
          )};color:#333333;font-weight: bold;word-break: break-all;" id='num'>${
          selectObj.num
        }</div>
          <div style="font-size: ${px2hd(12)};color:#999999;" id='text'>${
          selectObj.text
        }</div>
        </div>`}
        onLegendEndClick={onLegendEndClick}
      />
    </>
  );
};

export default DemoChart;
