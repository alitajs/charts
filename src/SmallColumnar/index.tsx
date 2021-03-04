import React, { FC, useState, useRef } from 'react';

import { Chart, Geometry, Axis, px2hd, Guide } from '@alitajs/f2';
import { SmallColumnarProps } from './PropsType';
import './index.less';

const prefixCls = 'alita-small-columnar';
const SmallColumnar: FC<SmallColumnarProps> = ({
  data = [],
  canvasPadding = [px2hd(90), px2hd(30), 'auto', 'auto'],
  colDefs,
  colorList = ['#F36A3F', '#67CA83'],
  style = {},
  aliasPosition = {
    x: 'date',
    y: 'value',
    c: 'colorIndex',
  },
}) => {
  return (
    <div className={`${prefixCls}`}>
      <Chart
        data={data}
        pixelRatio={window.devicePixelRatio}
        padding={canvasPadding}
        colDefs={colDefs}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
      >
        <Geometry
          type="interval"
          position={`${aliasPosition.x}*${aliasPosition.y}`}
          shape={'smooth'}
          color={[
            aliasPosition.c,
            (value: number) => {
              return colorList[value];
            },
          ]}
          style={{ radius: px2hd(11), width: px2hd(20) }}
          adjust="dodge"
          pixelRatio={window.devicePixelRatio}
        />
        <Axis
          field={aliasPosition.x}
          line={null}
          label={(text: string) => {
            const ctf = {
              fontSize: px2hd(30),
            };
            return ctf;
          }}
          grid={null}
        />
        <Axis
          field={aliasPosition.y}
          line={null}
          label={() => {
            return '';
          }}
          grid={null}
        />
        {data.map(item => {
          return (
            <Guide
              key={item[aliasPosition.y]}
              type="text"
              content={item[aliasPosition.y]}
              style={{ fill: '#333', fontSize: px2hd(24), fontWeight: 'bold' }}
              position={[item[aliasPosition.x], item[aliasPosition.y]]}
              offsetX={-px2hd(20)}
              offsetY={-px2hd(20)}
            />
          );
        })}
      </Chart>
    </div>
  );
};

export default SmallColumnar;
