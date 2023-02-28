import { useMemo } from 'react';
import { AxisProps } from './';

export interface UseAxis extends AxisProps {}

export default (props = {} as UseAxis) => {
  const { chart, field, enable = true, disable, ...reset } = props;
  useMemo(() => {
    if (!chart) return;
    if (disable) chart.axis(false);
    if (!field) return;
    if (enable === false) {
      chart.axis(field, false);
    } else {
      chart.axis(field, reset);
    }
  }, [chart, reset, field]);
  return null;
};
