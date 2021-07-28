import { ChartProps } from '@alitajs/f2/dist/Chart';
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
  colDefs?: ChartProps['colDefs'];
  /**
   * @description canvas边距
   * @default [px2hd(90), px2hd(30), 'auto', 'auto']
   */
  padding?: ChartProps['padding'];
  /**
   * @description 将x轴数据值映射到图形X轴字段名。
   */
  x: string;

  /**
   * @description 将y轴数据值映射到图形的位Y轴上的字段名
   */
  y: string;
}
