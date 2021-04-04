import React, { FC } from 'react';
import { Chart } from '@antv/f2';
import { prefixCls, DountProps, COLOR_MENU, drawLabel } from '../..';
import './index.less';

interface TableLegendProps extends DountProps {
  chart: Chart;
  tableHeader: DountProps['tableHeader'];
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
  } = props;
  return (
    <div className={`${prefixCls}-donut-table`}>
      <div className={`${prefixCls}-donut-table-header`}>
        <div className={`${prefixCls}-donut-table-header-type`}>
          {tableHeader[0]}
        </div>
        <div className={`${prefixCls}-donut-table-header-ratio`}>
          {tableHeader[1]}
        </div>
        <div className={`${prefixCls}-donut-table-header-num`}>
          {tableHeader[2]}
        </div>
      </div>
      <div>
        {data.map((item: any, index: number) => (
          <div
            className={`${prefixCls}-donut-table-body`}
            key={item[x]}
            onClick={() => {
              const selectShapeByLegend = chart?.get('selectShapeByLegendName');
              const onEnd = (clickedShape: any, coord: any, canvas: any) =>
                drawLabel(clickedShape, coord, canvas, x, y, total);
              selectShapeByLegend(item[x], onEnd);
              log('donut_table_legend_click');
            }}
          >
            <div className={`${prefixCls}-donut-table-body-type`}>
              <div
                className={`${prefixCls}-donut-table-dot`}
                style={{ backgroundColor: color[1][index] }}
              />
              {item[x]}
            </div>
            <div className={`${prefixCls}-donut-table-body-ratio`}>
              {`${((parseInt(item[y], 10) / total) * 100).toFixed(0)}%`}
            </div>
            <div className={`${prefixCls}-donut-table-body-num`}>{item[y]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLegend;
