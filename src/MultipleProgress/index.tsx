import React, { FC, useState } from 'react';
import classnames from 'classnames';
import './index.less';

interface ProgressPros {
  /**
   * @description 进度条颜色
   */
  color: string;
  /**
   * @description label文字
   */
  label: string;

  /**
   * @description 数量
   */
  count: number;
}
interface MultipleProgressPros {
  /**
   * @description 进度条颜色
   */
  data: ProgressPros[];
  /**
   *@description 进度条高度
   @default 8
   */
  height?: number;
}
const prefixCls = 'alita-multiple-progress';
const MultipleProgress: FC<MultipleProgressPros> = props => {
  const { data = [], height = 0 } = props;
  const countList = data.map((item: ProgressPros) => item.count);
  const sum = countList.reduce(function(prev, curr, idx, arr) {
    return prev + curr;
  });
  const cloumnsList = data.map(
    child => ((child.count / sum) as any).toFixed(2) * 100 + '%',
  );
  return (
    <div className={`${prefixCls}`}>
      <div
        className={`${prefixCls}-content`}
        style={
          height
            ? {
                height: height * window.devicePixelRatio,
                gridTemplateColumns: cloumnsList.join(' '),
              }
            : { gridTemplateColumns: cloumnsList.join(' ') }
        }
      >
        {data.map((item: ProgressPros, index) => {
          const { color, count } = item;
          return (
            <div>
              <div className={`${prefixCls}-percentage`}>
                {cloumnsList[index]}
              </div>
              <div
                key={count}
                style={{ backgroundColor: color }}
                className={classnames({
                  [`${prefixCls}-first-item`]: index === 0,
                  [`${prefixCls}-last-item`]: index === data.length - 1,
                  [`${prefixCls}-item`]: true,
                })}
              ></div>
            </div>
          );
        })}
      </div>
      <div className={`${prefixCls}-label`}>
        {data.map((item: ProgressPros, index) => {
          const { label, color } = item;
          return (
            <div className={`${prefixCls}-label-item`}>
              <div
                className={`${prefixCls}-label-rectangle`}
                style={{ backgroundColor: color }}
              ></div>
              <div className={`${prefixCls}-label-text`}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleProgress;
