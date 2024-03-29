import { ChartProps } from '@alitajs/f2/dist/Chart';
import { GeometryProps } from '@alitajs/f2/dist/Geometry';

export interface LineCanvasSizeProps {
  /**
   * @description 画布容器宽度
   * @default 100%
   */
  width: string | number;
  /**
   * @description 画布容器高度
   * @default 100%
   */
  height: string | number;
}

export interface LineChoiceProps {
  /**
   * @description x轴数据
   * @default -
   */
  title: string;
  /**
   * @description y轴数据
   * @default -
   */
  value: string;
  [key: string]: any;
}
export interface LineToolTipsViewProps {
  /**
   * @description x轴数据
   */
  title?: React.ReactNode;
  /**
   * @description y轴数据
   */
  subTitle?: React.ReactNode;
}

export interface LineProps {
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
   * @description 设置容器尺寸
   * @default 默认父容器宽高
   */
  canvasSize?: LineCanvasSizeProps;

  /**
   * @description 将x轴数据值映射到图形的位置上的方法。
   */
  x?: string;

  /**
   * @description 将y轴数据值映射到图形的位置上的方法。
   */
  y?: string;

  /**
   * @description 折线色值
   * @default l(0) 0:#8FA0FC 1:#4768FF
   */
  lineColor?: string;

  /**
   * @description 边线阴影色值
   * @default rgba(118, 140, 253, 0.1)
   */
  lineShadowColor?: string;

  /**
   * @description 区域色值
   * @default l(90) 0:#4768FF 1:#f5f5f5
   */
  areaColor?: string;

  /**
   * @description 配置toolTips弹出框内容
   * @default 默认x数据为title  y数据为subTitle
   */
  onRenderToolTips?: (e: LineChoiceProps) => LineToolTipsViewProps;

  /**
   * @description canvas边距
   * @default [px2hd(90), px2hd(30), 'auto', 'auto']
   */
  padding?: ChartProps['padding'];

  /**
   * @description 坐标轴颜色
   * @default #EDF0F5
   */
  axisLineColor?: string;

  /**
   * @description 坐标轴文字颜色
   * @default #BABABA
   */
  axisLabelColor?: string;

  /**
   * @description 坐标轴网格颜色
   * @default #EDF0F5
   */
  axisGridColor?: string;

  /**
   * @description x坐标轴文字渲染
   * @default LineAliasPositionProps['x']
   */
  axisXLabel?: (text: string) => string;

  /**
   * @description y坐标轴文字渲染
   * @default LineAliasPositionProps['y']
   */
  axisYLabel?: (text: string) => string;

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
