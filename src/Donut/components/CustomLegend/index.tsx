import React, { FC } from 'react';
import { Chart } from '@antv/f2';
import { prefixCls, DountProps, COLOR_MENU, drawLabel } from '../..';

export interface CustomLegendProps extends DountProps {
  chart?: Chart;
  tableHeader?: DountProps['tableHeader'];
  total: number;
  log: any;
}

const CustomLegend: FC<CustomLegendProps> = props => {
  const {
    chart,
    data = [],
    x,
    color = [`${x}`, COLOR_MENU],
    y,
    total,
    log,
    drawLabelFlag = true,
    renderLegend,
  } = props;
  return (
    <div className={`${prefixCls}-donut-custom`}>
      {data.map(
        (item: any, index: number) =>
          renderLegend &&
          renderLegend(
            {
              item,
              index,
              color: color[1][index],
              total,
              x,
              y,
            },
            () => {
              const selectShapeByLegend = chart?.get('selectShapeByLegendName');
              const onEnd = (clickedShape: any, coord: any, canvas: any) =>
                drawLabel(
                  clickedShape,
                  coord,
                  canvas,
                  x,
                  y,
                  total,
                  drawLabelFlag,
                );
              selectShapeByLegend(item[x], onEnd);
              log('donut_custom_legend_click');
            },
          ),
      )}
    </div>
  );
};

export default CustomLegend;
