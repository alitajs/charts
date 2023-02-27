import { ChartProps } from '@alitajs/f2/dist/Chart';
import { CSSProperties } from 'react';
export interface StackColumnDataProps {
  [key: string]: string | number;
}

export interface StackColumnLegendParamsProps {
  /**
   * 字段对应别名
   */
  label: string;
  /**
   * 字段名
   */
  value: string;
}

export interface StackColumnProps {
  /**
   * @description 图表的数据
   */
  data: StackColumnDataProps[];
  /**
   * 图例内容
   */
  legendParams: StackColumnLegendParamsProps[];
  /**
   * 横坐标的值
   */
  x: string;
  /**
   * 颜色列表
   * @default ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75']
   */
  color?: string[];
  /**
   * 对数据进行单属性过滤，比如展示数值加上单位
   * @default
   * {
   * index: {
        tickInterval: 1,
        min: -0.4,
        max: 3.1,
        range: [0, 0.89],
      }}
   */
  colDefs?: ChartProps['colDefs'];

  /*
   * style
   */
  style?: CSSProperties;

  /**
   *  xStyle x轴信息，包括字体大小等
   *
   */
  xStyle?: any;

  /**
   *  yStyle x轴信息，包括字体大小等
   *
   */
  yStyle?: any;
}
