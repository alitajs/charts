import React, { useImperativeHandle, forwardRef } from 'react';
import useScrollBar from './useScrollBar';
import { Chart as F2Chart, ScrollBarParams } from '@antv/f2';

export interface ScrollBarProps extends ScrollBarParams {
  chart: F2Chart;
}

export default forwardRef<ScrollBarProps, ScrollBarProps>((props, ref) => {
  useScrollBar(props);
  useImperativeHandle(ref, () => ({ ...props }), []);
  return null;
});
