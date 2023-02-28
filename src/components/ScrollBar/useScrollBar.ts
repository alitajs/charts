import { useMemo } from 'react';
import { ScrollBarProps } from './';

export interface UseScrollBar extends ScrollBarProps {
  visible?: boolean;
}

export default (props = {} as UseScrollBar) => {
  const { chart, visible, ...reset } = props;
  useMemo(() => {
    if (!chart) return;
    if (!visible) {
      // 隐藏时可不显示滚动条
      chart.scrollBar({});
      return;
    }
    chart.scrollBar(reset);
  }, [chart, reset, visible]);

  return null;
};
