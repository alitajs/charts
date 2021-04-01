import React from 'react';
import {
  Chart,
  Geometry,
  Tooltip,
  Legend,
  Coordinate,
  Axis,
  Guide,
  px2hd,
  F2,
} from '@alitajs/f2';
import SumBy from 'lodash/sumBy';
import { withError, useTracker } from '@alitajs/tracker';
import { ChartProps } from '@alitajs/f2/dist/Chart';
import { LegendItem } from '@antv/f2/types/Legend';
import './index.less';

const { Util, G } = F2;
const { Group } = G;

const prefixCls = 'alitajs-charts';

const COLOR_MENU = ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75'];

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
  /**
   * 对数据进行单属性过滤，比如展示数值加上单位
   */
  colDefs?: ChartProps['colDefs'];
  /**
   * 图表取得横纵属性值，如x*y
   */
  x: string;
  /**
   * 图表取得横纵属性值，如x*y
   */
  y: string;
  /**
   * 自定义图表颜色，若超过5个颜色，需要自行定义
   * @default ['name', ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75']]
   */
  color?: any[];
  /**
   * 图表中央显示数字
   */
  sumText?: string;
  /**
   * 图表中央显示文字
   */
  sumTitle?: string;
  /**
   * 表格自定义标题
   * @default ['分类', '占比', '数量']
   */
  tableHeader?: string[];
}

interface TableLegendProps
  extends Omit<
    DountProps,
    'type' | 'title' | 'colDefs' | 'sumText' | 'sumTitle'
  > {
  chart?: ChartProps;
  total: number;
  log: any;
}

function drawLabel(
  shape: any,
  coord: any,
  canvas: any,
  resX: string,
  resY: string,
  total: number,
) {
  const center = coord.center;
  const origin = shape.get('origin');
  const points = origin.points;
  const x1 = (points[2].x - points[1].x) * 0.75 + points[1].x;
  const x2 = (points[2].x - points[1].x) * 1.8 + points[1].x;
  const y = (points[0].y + points[1].y) / 2;
  const point1 = coord.convertPoint({
    x: x1,
    y: y,
  });
  const point2 = coord.convertPoint({
    x: x2,
    y: y,
  });

  const group = new Group();
  group.addShape('Line', {
    attrs: {
      x1: point1.x,
      y1: point1.y,
      x2: point2.x,
      y2: point2.y,
      stroke: '#5E5CE6',
    },
  });

  const text = group.addShape('Text', {
    attrs: {
      x: point2.x,
      y: point2.y,
      text:
        origin._origin[resX] +
        ' ' +
        (origin._origin[resY] / total).toFixed(2) +
        '%',
      fill: '#5E5CE6',
      fontSize: px2hd(24),
      textAlign: 'start',
      textBaseline: 'bottom',
    },
  });
  const textWidth = text.getBBox().width;
  const baseLine = group.addShape('Line', {
    attrs: {
      x1: point2.x,
      y1: point2.y,
      x2: point2.x,
      y2: point2.y,
      stroke: '#5E5CE6',
    },
  });
  if (point2.x > center.x) {
    baseLine.attr('x2', point2.x + textWidth);
  } else if (point2.x < center.x) {
    text.attr('textAlign', 'end');
    baseLine.attr('x2', point2.x - textWidth);
  } else {
    text.attr('textAlign', 'center');
    text.attr('textBaseline', 'top');
  }
  canvas.add(group);
  shape.label = group;
}

/**
 * 表格图例
 * @param e
 */
const TableLegend = (e: TableLegendProps) => {
  const {
    chart,
    tableHeader = [],
    data = [],
    x,
    color = [`${x}`, COLOR_MENU],
    y,
    total,
    log,
  } = e;
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
              chart?.get('selectShapeByLegend')(item[x]);
              log('onClick');
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

const Donut: React.FC<DountProps> = props => {
  const {
    data,
    type = 'normal',
    colDefs = {},
    x,
    y,
    color = [`${x}`, COLOR_MENU],
    sumText,
    sumTitle = '',
    ...reset
  } = props;

  const log = useTracker(Donut.displayName, {
    type,
  });

  const total = SumBy(data, y);

  const isTableLegend = type === 'table';
  if (!data) {
    return <p>data is undefined!</p>;
  }
  const newdate = [] as any[];
  const legendItems = [] as LegendItem[];
  data.map((obj: any, index: number) => {
    legendItems.push({
      name: obj[x],
      value: obj[y].toFixed(2),
      marker: {
        symbol: 'circle',
        fill: color[1][index],
        radius: px2hd(8),
      },
    });
    newdate.push({ ...obj });
  });

  const htmlStr = `<div style="width: 2.5rem;height: 0.4rem;text-align: center;">
  <div style="font-size: 0.42rem;color:#333333;font-weight: bold;word-break: break-all;">${sumText}</div>
  <div style="font-size: 0.24rem;color:#999999;">${sumTitle}</div>
</div>`;

  return (
    <div>
      <div>
        <Chart
          width={750}
          height={isTableLegend ? 500 : 700}
          data={newdate}
          colDefs={colDefs}
          pixelRatio={window.devicePixelRatio}
          {...reset}
        >
          <Tooltip disable />
          <Legend
            disable={isTableLegend}
            custom={true}
            position="bottom"
            align="center"
            wordSpace={px2hd(18)}
            itemMarginBottom={px2hd(36)}
            itemGap={px2hd(150)}
            itemWidth={px2hd(240)}
            nameStyle={{
              fontSize: px2hd(30), // 文本大小
              fill: '#999',
            }}
            joinString=" "
            titleStyle={{
              textAlign: 'start',
            }}
            valueStyle={{
              fill: '#333', // 文本的颜色
              fontSize: px2hd(30), // 文本大小
              lineHeight: 34,
            }}
            items={legendItems}
            onClick={(ev: any) => {
              const { clickedItem, selectShapeByLegend } = ev;
              const dataName = clickedItem.get('name');
              const onEnd = (clickedShape: any, coord: any, canvas: any) =>
                drawLabel(clickedShape, coord, canvas, x, y, total);
              selectShapeByLegend(dataName, onEnd);
              log('onClick');
            }}
          />
          <Coordinate type="polar" transposed innerRadius={0.8} radius={0.8} />
          <Axis disable />
          <Geometry
            type="interval"
            position={`a*${y}`}
            color={color}
            adjust="stack"
            size={px2hd(60)}
          />
          <Guide type="html" position={() => ['50%', '45%']} html={htmlStr} />
          {isTableLegend && (
            <TableLegend {...props} color={color} total={total} log={log} />
          )}
        </Chart>
      </div>
    </div>
  );
};
Donut.displayName = 'Donut';
export default withError(Donut);
