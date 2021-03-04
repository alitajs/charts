import React, { FC, useState } from 'react';
import './index.less';
const prefixCls = 'alita-progress';
interface SingleProgressPros {
  /**
   * @description 总的数量
   */
  total: number;
  /**
   * @description 当前数量
   */
  count: number;
  /**
   * @description 要展示的进度条颜色
   * @default #3563F5
   */
  color?: string;
  /**
   * @description 进度条上部分的内容
   *
   */
  topNode?: React.ReactNode;
  /**
   * @description 进度条右边的内容
   */
  rightNode?: React.ReactNode;
  /**
   * @description 背后进度条的颜色
   * @default #EDF0F5
   */
  bgColor?: string;
}

const SingleProgress: FC<SingleProgressPros> = props => {
  const {
    total,
    count,
    bgColor = '#EDF0F5',
    color = '#3563F5',
    topNode = <></>,
    rightNode = <></>,
  } = props;
  const spanWidth = ((count / total) as any).toFixed(2) * 100;
  return (
    <div className={`${prefixCls}`}>
      {topNode}
      <div className={`${prefixCls}-item`}>
        <div
          className={`${prefixCls}-content`}
          style={{ backgroundColor: bgColor }}
        >
          <span
            className={`${prefixCls}-span`}
            style={{ width: spanWidth + '%', backgroundColor: color }}
          ></span>
        </div>
        {rightNode}
      </div>
    </div>
  );
};

export default SingleProgress;
