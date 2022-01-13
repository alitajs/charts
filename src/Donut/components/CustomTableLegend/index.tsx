import React, { FC } from 'react';
import { Chart } from '@antv/f2';
import classnames from 'classnames';
import { prefixCls, DountProps, COLOR_MENU, drawLabel } from '../..';
import './index.less';

interface TableLegendProps extends DountProps {
  chart?: Chart;
  tableHeader?: DountProps['tableHeader'];
  total: number;
  log: any;
}

const TableLegend: FC<TableLegendProps> = props => {
  const {
    chart,
    tableHeader = [],
    data = [],
    x,
    color = [`${x}`, COLOR_MENU],
    y,
    total,
    log,
    drawLabelFlag = true,
  } = props;
  return (
    <div className={`${prefixCls}-donut-table`}>
      <div className={`${prefixCls}-donut-table-header`}>
        {tableHeader.map(header => {
          return (
            <div
              key={typeof header === 'object' ? header.value : header}
              className={`${prefixCls}-donut-table-header-type`}
            >
              {typeof header === 'object' ? header.title : header}
            </div>
          );
        })}
      </div>
      <div>
        {data.map((item: any, index: number) => (
          <div
            className={`${prefixCls}-donut-table-body`}
            key={item[x]}
            onClick={() => {
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
              log('donut_custom_table_legend_click');
            }}
          >
            {tableHeader.map(header => {
              const value = typeof header === 'object' ? header.value : header;
              const showDot =
                typeof header === 'object' ? header.showDot : false;
              return (
                <div className={`${prefixCls}-donut-table-body-type`}>
                  {showDot && (
                    <div
                      className={`${prefixCls}-donut-table-dot`}
                      style={{ backgroundColor: color[1][index] }}
                    />
                  )}
                  {item[value]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLegend;
