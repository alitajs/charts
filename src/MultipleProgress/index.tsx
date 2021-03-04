import React, { FC } from 'react';
import classnames from 'classnames';
import './index.less';

interface ProgressProps {
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
interface MultipleProgressProps {
  /**
   * @description 进度条颜色
   */
  data: ProgressProps[];
  /**
   * @description 进度条高度
   * @default 8
   */
  height?: number;
}
const prefixCls = 'alita-multiple-progress';
const MultipleProgress: FC<MultipleProgressProps> = props => {
  const { data = [], height = 0 } = props;
  const countList = data.map((item: ProgressProps) => item.count);
  const sum = countList.reduce(function(prev, curr) {
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
        {data.map((item: ProgressProps, index) => {
          const { color, count } = item;
          return (
            <div key={count}>
              <div className={`${prefixCls}-percentage`}>
                {cloumnsList[index]}
              </div>
              <div
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
        {data.map((item: ProgressProps, index) => {
          const { label, color, count } = item;
          return (
            <div className={`${prefixCls}-label-item`} key={count + index}>
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
