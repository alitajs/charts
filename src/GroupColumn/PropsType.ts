export interface GroupColumnDataProps {
  [key: string]: string | number;
}

export interface GroupColumnLegendListProps {
  /**
   * 字段对应别名
   */
  label: string;
  /**
   * 字段名
   */
  value: string;
  /**
   * 图例颜色
   */
  color?: string;
}
