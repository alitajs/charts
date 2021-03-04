import React, { FC } from 'react';
import { useTracker, withError } from '@alitajs/tracker';
import LineBasic from './LineBasic';
import { LineProps } from './PropsType';

const prefixCls = 'alita-line';
const Line: FC<LineProps> = props => {
  const log = useTracker(Line.displayName, {});
  return (
    <div className={prefixCls}>
      <LineBasic {...props} />
    </div>
  );
};

Line.displayName = 'Line';
export default withError(Line);
