import { ChartProps } from '@alitajs/f2/dist/Chart';

export interface ColumnAliasPositionProps {
  /**
   * @description x轴字段名称
   * @default date
   */
  x: string;
  /**
   * @description y轴字段名称
   * @default value
   */
  y: string;
  /**
   * @description 柱状图颜色下标的字段名称
   * @default colorIndex
   */
  c: string;
}

export interface SmallColumnarProps {
  /**
   * @description 图表的数据
   */
  data: ChartProps['data'];
  /**
   * @description canvas样式
   */
  style?: ChartProps['style'];
  /**
   * @description 数据记录的度量。
   */
  colDefs: ChartProps['colDefs'];
  /**
   * @description canvas边距
   * @default [px2hd(90), px2hd(30), 'auto', 'auto']
   */
  canvasPadding?: ChartProps['padding'];
  /**
   * @description xy轴渲染字段
   */
  aliasPosition?: ColumnAliasPositionProps;
  /**
   * @description 住状图眼色值
   * @default ['#F36A3F','#67CA83']
   */
  colorList?: string[];
}
