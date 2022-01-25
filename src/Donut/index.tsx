import React, { CSSProperties, useRef } from 'react';
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
import classnames from 'classnames';
import SumBy from 'lodash/sumBy';
import Max from 'lodash/max';
import { withError, useTracker } from '@alitajs/tracker';
import { ChartProps } from '@alitajs/f2/dist/Chart';
import { LegendItem } from '@antv/f2/types/Legend';
import {
  TableLegend,
  RightLegend,
  CustomTableLegend,
  CustomLegend,
} from './components';
import { CustomLegendProps } from './components/CustomLegend';
import './index.less';

const { G } = F2;
const { Group } = G;

export const prefixCls = 'alitajs-charts';

export const COLOR_MENU = [
  '#5E5CE6',
  '#2689F4',
  '#4DCB75',
  '#74D2B6',
  '#E0F0FD',
  '#F36A3F',
  '#E58A3C',
  '#F6C65D',
];

interface LegendItemProps {
  item: any;
  index: number;
  color?: string;
  total: number;
  x: string;
  y: string;
}

export interface DountCustomTypeProps {
  value: string;
  title: string;
  showDot?: boolean;
}

export interface DountProps {
  /**
   * 图表展示数据
   */
  data: ChartProps['data'];
  /**
   * 图表类型
   * @default normal
   */
  type?:
    | 'normal'
    | 'table'
    | 'legBottom'
    | 'singleLeg'
    | 'customTable'
    | 'custom';
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
   * 点击图例是否会显示 label 文字
   * @default true
   */
  drawLabelFlag?: boolean;
  /**
   * 表格自定义标题
   * @default ['分类', '占比', '数量']
   */
  tableHeader?: string[] | DountCustomTypeProps[];
  /*
   * style
   */
  style?: CSSProperties;
  /**
   * 环形图内部内容自定义
   * @default `<div style="width: ${px2hd(125)}px;text-align: center;">
        <div style="font-size:${px2hd(
          42,
        )};color:#333333;font-weight: bold;word-break: break-all;">${sumText}</div>
        <div style="font-size: ${px2hd(12)};color:#999999;">${sumTitle}</div>
      </div>`
   */
  htmlStr?: string;
  /**
   * 右侧图例点击事件
   */
  onLegendEndClick?: (ev: any) => void;
  /**
   * 环形图大小设置
   * 以对象的形式进行传递
   * @default innerRadius={0.8}radius={0.8}
   *
   */
  coordinateProps?: any;

  /**
   * @description 自定义图例信息 只有type为custom时生效
   * @default -
   */
  renderLegend: (
    legend: LegendItemProps,
    showSelectShapeCallback: () => void,
  ) => React.ReactNode;
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

export const drawLabel = (
  shape: any,
  coord: any,
  canvas: any,
  resX: string,
  resY: string,
  total: number,
  showText = true,
) => {
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
  if (showText) {
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
        y: point2.y - px2hd(8),
        text: origin._origin[resX],
        fill: '#5E5CE6',
        fontSize: px2hd(24),
        textAlign: 'start',
        textBaseline: 'bottom',
      },
    });
    const percentText = group.addShape('Text', {
      attrs: {
        x: point2.x,
        y: point2.y + px2hd(30),
        text: ((origin._origin[resY] / total) * 100).toFixed(2) + '%',
        fill: '#5E5CE6',
        fontSize: px2hd(24),
        textAlign: 'start',
        textBaseline: 'bottom',
      },
    });
    const textWidth = Max([text.getBBox().width, percentText.getBBox().width]);
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
      percentText.attr('textAlign', 'end');
      baseLine.attr('x2', point2.x - textWidth);
    } else {
      text.attr('textAlign', 'center');
      text.attr('textBaseline', 'top');
      percentText.attr('textAlign', 'center');
      percentText.attr('textBaseline', 'top');
    }
  }
  canvas.add(group);
  shape.label = group;
};

const Donut: React.FC<DountProps> = props => {
  const {
    data,
    type = 'normal',
    colDefs = {},
    x = 'name',
    y,
    color = [`${x}`, COLOR_MENU],
    sumText,
    sumTitle = '',
    style,
    drawLabelFlag = true,
    coordinateProps = {},
    renderLegend,
    htmlStr = `<div style="width: ${px2hd(125)}px;text-align: center;">
  <div style="font-size:${px2hd(
    42,
  )};color:#333333;font-weight: bold;word-break: break-all;">${sumText}</div>
  <div style="font-size: ${px2hd(12)};color:#999999;">${sumTitle}</div>
</div>`,
    onLegendEndClick,
    ...reset
  } = props;
  const log = useTracker(Donut.displayName, {
    type,
  });

  const total = SumBy(data, y);
  const ref: any = useRef();

  const isTableLegend = type === 'table';
  const isRightLegend = type === 'normal';
  const isCustomTableLegend = type === 'customTable';
  const isCustomLegend = type === 'custom';

  if (!data) {
    return <p>data is undefined!</p>;
  }
  const newdate = [] as any[];
  const legendItems = [] as LegendItem[];
  data.map((obj: any, index: number) => {
    let singleLegend = {
      name: obj[x],
      [x]: obj[x],
      value: parseFloat(obj[y]),
      marker: {
        symbol: 'circle',
        fill: color[1][index],
        radius: px2hd(8),
      },
    } as any;

    if (`${obj[y]}`.indexOf('.'))
      singleLegend.value = parseFloat(obj[y]).toFixed(2);
    legendItems.push(singleLegend);
    obj.name = obj[x];
    newdate.push({ ...obj });
  });
  return (
    <div
      className={classnames({
        [`${prefixCls}-donut`]: true,
        [`${prefixCls}-donut-leg-right`]: type === 'normal',
      })}
      style={style}
    >
      <Chart
        ref={ref}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          ...style,
        }}
        data={newdate}
        colDefs={colDefs}
        pixelRatio={window.devicePixelRatio}
        {...reset}
      >
        <Tooltip disable />
        <Legend
          disable={type !== 'singleLeg' && type !== 'legBottom'}
          custom={true}
          position={
            type === 'normal' || type === 'singleLeg' ? 'right' : 'bottom'
          }
          align="center"
          wordSpace={px2hd(18)}
          itemMarginBottom={px2hd(36)}
          itemGap={px2hd(150)}
          itemWidth={px2hd(180)}
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
              drawLabel(
                clickedShape,
                coord,
                canvas,
                x,
                y,
                total,
                drawLabelFlag,
              );
            selectShapeByLegend(dataName, onEnd);
            onLegendEndClick && onLegendEndClick(clickedItem);
            log('donut_legend_bottom_click');
          }}
        />
        <Coordinate
          type="polar"
          transposed
          innerRadius={0.8}
          radius={0.8}
          {...coordinateProps}
        />
        <Axis disable />
        <Geometry
          type="interval"
          position={`a*${y}`}
          color={color}
          adjust="stack"
          size={px2hd(60)}
          pixelRatio={window.devicePixelRatio}
        />
        <Guide type="html" position={() => ['50%', '50%']} html={htmlStr} />
        {isTableLegend && (
          <TableLegend {...props} color={color} total={total} log={log} />
        )}
        {isRightLegend && (
          <RightLegend {...props} color={color} total={total} log={log} />
        )}
        {isCustomTableLegend && (
          <CustomTableLegend {...props} color={color} total={total} log={log} />
        )}
        {isCustomLegend && (
          <CustomLegend
            {...props}
            color={color}
            total={total}
            log={log}
            renderLegend={renderLegend}
          />
        )}
      </Chart>
    </div>
  );
};
Donut.displayName = 'Donut';
export default withError(Donut);
