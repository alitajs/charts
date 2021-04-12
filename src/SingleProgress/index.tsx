/*
 * @Descripttion:
 * @Author: wll
 * @Date: 2021-04-12 16:18:14
 */
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
  count: number | string;
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
  const transformCount = (count: number | string) => {
    let tempCount: number = 0;
    if (typeof count === 'string') {
      tempCount = parseInt(count);
    } else {
      tempCount = count;
    }
    return tempCount;
  };
  const persent = ((transformCount(count) * 100) / total).toFixed(2);
  const spanWidth = parseFloat(persent) > 100 ? '100%' : `${persent}%`;
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
            style={{
              width: spanWidth,
              backgroundColor: color,
            }}
          ></span>
        </div>
        <div className={`${prefixCls}-right-node`}>{rightNode}</div>
      </div>
    </div>
  );
};

export default SingleProgress;
