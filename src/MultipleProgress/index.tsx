/*
 * @Descripttion:
 * @Author: wll
 * @Date: 2021-03-04 17:21:29
 */
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
  count: number | string;
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

  const transformCount = (count: number | string) => {
    let tempCount: number = 0;
    if (typeof count === 'string') {
      tempCount = parseInt(count);
    } else {
      tempCount = count;
    }
    return tempCount;
  };
  const countList = data.map((item: ProgressProps) =>
    transformCount(item.count),
  );
  const sum = countList.length
    ? countList.reduce(function(prev, curr) {
        return prev + curr;
      })
    : 0;
  const cloumnsList = data.length
    ? data.map(child => {
        const persent = `${((transformCount(child.count) * 100) / sum).toFixed(
          2,
        )}%`;
        return persent;
      })
    : [];
  return (
    <>
      {data.length ? (
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
                <div
                  className={`${prefixCls}-label-item`}
                  key={`${count}${index}`}
                >
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
      ) : (
        ''
      )}
    </>
  );
};

export default MultipleProgress;
