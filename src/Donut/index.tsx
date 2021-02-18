import React, { useState } from 'react';
import {
  Chart,
  Geometry,
  Tooltip,
  Legend,
  Coordinate,
  Axis,
  Guide,
  px2hd,
  PieLabel,
  getPercentage,
} from '@alitajs/f2';
import { ChartProps } from '@alitajs/f2/dist/Chart';

interface DountProps {
  /**
   * 图表展示数据
   */
  data: ChartProps['data'];
  /**
   * 图表类型
   * @default normal
   */
  type?: 'normal' | 'table';
  title?: string;
  /**
   * 对数据进行单属性过滤，比如展示数值加上单位
   */
  colDefs?: ChartProps['colDefs'];
  /**
   * 图表取得横纵属性值，如x*y
   */
  // position: string;
  x: string;
  y: string;
  /**
   * 自定义图表颜色
   * @default ['name', ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75']]
   */
  color?: any[];
  /**
   * 图表中央显示数字
   */
  sumText?: string;
  /**
   * 图表中央显示文字
   * @default 总资产
   */
  sumTitle?: string;
}
const Donut: React.FC<DountProps> = props => {
  const {
    data,
    type = 'normal',
    title,
    colDefs = {},
    x,
    y,
    color = [`${x}`, ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75']],
    sumText,
    sumTitle = '总资产',
  } = props;
  const isTableLegend = type === 'table';
  if (!data) {
    return <p>data is undefined!</p>;
  }
  const map = {} as any;
  let sum = 0;
  const newdate = data.map(function(obj) {
    map[obj[x]] = obj[y];
    sum += obj[y];
    return { ...obj, a: '1' };
  });
  const htmlStr = `<div style="width: 2.5rem;height: 0.4rem;text-align: center;">
  <div style="font-size: 0.56rem;color:#333333;font-weight: bold;">${sumText}</div>
  <div style="font-size: 0.24rem;color:#999999;">${sumTitle}</div>
</div>`;
  console.log(px2hd(726));
  return (
    <div
      style={{
        margin: '0.24rem',
        backgroundColor: '#FFF',
        borderRadius: '0.16rem',
        paddingBottom: '0.6rem',
      }}
    >
      {title && (
        <div
          style={{
            fontSize: '0.32rem',
            color: '#333333',
            padding: '0.32rem',
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      )}
      <Chart
        width={726}
        height={isTableLegend ? 726 : 850}
        data={newdate}
        colDefs={colDefs}
        pixelRatio={window.devicePixelRatio}
      >
        <Tooltip disable />
        <Legend
          disable={isTableLegend}
          position="bottom"
          itemFormatter={(val: any) => {
            return val + '    ' + map[val];
          }}
        />
        <Coordinate type="polar" transposed innerRadius={0.7} radius={0.85} />
        <Axis disable />
        <PieLabel
          sidePadding={px2hd(40)}
          activeShape
          label1={(data: any) => {
            return {
              text: data[x] + getPercentage(data[y] / sum) + '%',
              fill: '#5E5CE6',
            };
          }}
        />
        <Geometry
          type="interval"
          position={`a*${y}`}
          color={color}
          adjust="stack"
          size={px2hd(100)}
        />
        <Guide type="html" position={['50%', '45%']} html={htmlStr} />
      </Chart>
    </div>
  );
};

export default Donut;
