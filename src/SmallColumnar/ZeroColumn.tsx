import React, { FC, useMemo } from 'react';
import {
  Chart,
  Geometry,
  Axis,
  px2hd,
  Tooltip,
  Interaction,
  Guide,
} from '@alitajs/f2';
import { ZeroColumnProps } from './PropsType';
import { COLORS } from '../utils/color';
import './index.less';

const prefixCls = 'alita-small-columnar';
const ZeroColumn: FC<ZeroColumnProps> = ({
  data = [],
  padding = [px2hd(90), px2hd(30), 'auto', 'auto'],
  style = {},
  x,
  y,
  colDefs = {
    index: {
      tickInterval: 1,
      min: -0.4,
      max: 4.1,
      range: [0, 0.89],
    },
  },
  showToolTips = true,
  showGuide = false,
  ...reset
}) => {
  const newData = useMemo(
    () =>
      data?.map((item, index) => {
        return {
          x: item[x],
          y: +item[y] || 0,
          ...item,
          color: item.color || COLORS[index % COLORS.length],
          index,
        };
      }),
    [data],
  );

  return (
    <div className={prefixCls}>
      <Chart
        data={newData}
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
          position="index*y"
          shape={'dodge'}
          style={{ radius: px2hd(11), width: px2hd(20) }}
          adjust="stack"
          pixelRatio={window.devicePixelRatio}
          // color="index"
        />
        <Axis
          field="index"
          line={null}
          label={text => {
            const ctf = {
              fontSize: px2hd(22),
              textAlign: 'center',
              fill: '#999',
              text: newData[parseInt(text, 10)].x,
            };
            return ctf;
          }}
          grid={null}
        />
        <Axis
          field="y"
          line={null}
          label={() => {
            return '';
          }}
          grid={null}
        />
        <Interaction field="pan" />
        {showToolTips && (
          <Tooltip
            triggerOn={['touchstart', 'touchmove']}
            tooltipMarkerStyle={{
              width: px2hd(20),
              margin: [-px2hd(10), 0],
            }}
            background={{
              radius: 2,
              padding: [px2hd(10), px2hd(16)],
            }}
            nameStyle={{
              fontSize: px2hd(20),
              fill: '#fff',
              textAlign: 'start',
              textBaseline: 'middle',
            }}
            valueStyle={{
              fontSize: px2hd(20),
              fill: '#fff',
              textAlign: 'start',
              textBaseline: 'middle',
            }}
            itemMarkerStyle={{
              radius: px2hd(7),
              symbol: 'circle',
              lineWidth: 0,
            }}
            onShow={ev => {
              const items = ev.items;
              items[0].name = items[0].origin.x;
              const value = items[0].value;
              items[0].value = value;
            }}
          />
        )}
        {showGuide &&
          newData.map(item => {
            const stringY =
              typeof item.y === 'number' ? String(item.y) : item.y || '';
            return (
              <Guide
                key={`${item.index}`}
                type="text"
                limitInPlot={true}
                style={{
                  textBaseline: 'bottom',
                  textAlign: 'center',
                  fontSize: px2hd(24),
                }}
                content={item?.y}
                position={[item?.index, item?.y]}
                offsetY={px2hd(-10)}
                offsetX={px2hd(4)}
              />
            );
          })}
      </Chart>
    </div>
  );
};

export default ZeroColumn;
