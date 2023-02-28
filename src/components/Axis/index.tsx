import React, { useImperativeHandle, forwardRef } from 'react';
import useAxis from './useAxis';
import { Chart as F2Chart, AxisParams, DataRecord, DataField } from '@antv/f2';

export interface AxisProps
  extends AxisParams<DataRecord, DataField<DataRecord>> {
  chart: F2Chart;
  /**
   * 当 enable 为 false 时，关闭 field 对应的坐标轴。
   * @default true
   */
  enable?: boolean;
  /**
   * 当 disable 为 true 时，不渲染坐标轴
   */
  disable?: boolean;
  /**
   * 代表坐标轴对应的数据字段名
   */
  field?: string;
}

export default forwardRef<AxisProps, AxisProps>((props, ref) => {
  useAxis(props);
  useImperativeHandle(ref, () => ({ ...props }), []);
  return null;
});
