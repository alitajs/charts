import React, { FC } from 'react';
import { Chart, Geometry, Axis, px2hd, Guide } from '@alitajs/f2';
import { SmallColumnarProps } from './PropsType';
import './index.less';

const prefixCls = 'alita-small-columnar';
const SmallColumnar: FC<SmallColumnarProps> = ({
  data = [],
  padding = [px2hd(90), px2hd(30), 'auto', 'auto'],
  colDefs,
  color = ['#F36A3F', '#67CA83'],
  style = {},
  x,
  y,
  aliasColor = 'colorIndex',
  ...reset
}) => {
  return (
    <div className={`${prefixCls}`}>
      <Chart
        data={data}
        pixelRatio={window.devicePixelRatio}
        padding={padding}
        colDefs={colDefs}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
        {...reset}
      >
        <Geometry
          type="interval"
          position={`${x}*${y}`}
          shape={'smooth'}
          color={[
            aliasColor,
            (value: number) => {
              return color[value];
            },
          ]}
          style={{ radius: px2hd(11), width: px2hd(20) }}
          adjust="dodge"
          pixelRatio={window.devicePixelRatio}
        />
        <Axis
          field={x}
          line={null}
          label={() => {
            const ctf = {
              fontSize: px2hd(30),
            };
            return ctf;
          }}
          grid={null}
        />
        <Axis
          field={y}
          line={null}
          label={() => {
            return '';
          }}
          grid={null}
        />
        {data.map(item => {
          return (
            <Guide
              key={item[y]}
              type="text"
              content={item[y]}
              style={{ fill: '#333', fontSize: px2hd(24), fontWeight: 'bold' }}
              position={[item[x], item[y]]}
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
