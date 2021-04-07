import React, { FC } from 'react';
import { Chart } from '@antv/f2';
import { prefixCls, DountProps, COLOR_MENU, drawLabel } from '../..';
import './index.less';

interface RightLegendProps extends DountProps {
  chart?: Chart;
  tableHeader?: DountProps['tableHeader'];
  total: number;
  log: any;
}

const RightLegend: FC<RightLegendProps> = props => {
  const {
    chart,
    total,
    data = [],
    x,
    y,
    color = [`${x}`, COLOR_MENU],
    log,
  } = props;
  return (
    <div className={`${prefixCls}-donut-leg`}>
      {data.map((item: any, index: number) => (
        <div
          key={item[x]}
          className={`${prefixCls}-donut-leg-item`}
          onClick={() => {
            const selectShapeByLegend = chart?.get('selectShapeByLegendName');
            const onEnd = (clickedShape: any, coord: any, canvas: any) =>
              drawLabel(clickedShape, coord, canvas, x, y, total, false);
            selectShapeByLegend(item[x], onEnd);
            log('donut_normal_click');
          }}
        >
          <div
            className={`${prefixCls}-donut-leg-marker`}
            style={{
              backgroundColor: color[1][index],
            }}
          />
          <div className={`${prefixCls}-donut-leg-value`}>
            {item.name}·{item[y]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightLegend;
