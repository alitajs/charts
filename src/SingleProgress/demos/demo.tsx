/*
 * @Descripttion:
 * @Author: wll
 * @Date: 2021-03-04 17:21:29
 */
import React, { FC } from 'react';
import { SingleProgress } from '@alitajs/charts';
import './index.less';

const prefixCls = 'single-progress-demo';
interface DemoProps {}

const Demo: FC<DemoProps> = props => {
  const data = [
    { total: 100, count: 65, color: '#F36A3F', text: '本月客户建档率' },
    { total: 100, count: 23, color: '#0089FF', text: '本月线索转化率' },
    { total: 100, count: 12, color: '#01BB7F', text: '本月商机转化率' },
  ];
  const data1 = [
    { total: 10, count: 6, color: '#F36A3F' },
    { total: 10, count: 4, color: '#0089FF' },
  ];
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-progress`}>
        <div className={`${prefixCls}-title`}>卡片标题</div>
        <div className={`${prefixCls}-subTitlle`}>
          <span></span>成员总数、本月新增、重要成员和普通成员占比
        </div>
        {data1.map(item => {
          const { color, total, count } = item;
          return (
            <div className={`${prefixCls}-item`} key={count}>
              <div
                className={`${prefixCls}-item-left`}
                style={{ backgroundColor: color }}
              ></div>
              <div style={{ width: '60%' }}>
                <SingleProgress
                  total={total}
                  count={count}
                  color={color}
                  topNode={
                    <div>
                      {count}名 | 占比
                      {((count / total) as any).toFixed(2) * 100}%
                    </div>
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${prefixCls}-progress`} style={{ marginTop: 30 }}>
        <div className={`${prefixCls}-title`}>卡片标题</div>
        {data.map(item => {
          const { color, total, count, text } = item;
          return (
            <div className={`${prefixCls}-item`} key={count}>
              <div
                className={`${prefixCls}-item-left`}
                style={{ backgroundColor: color }}
              ></div>

              <SingleProgress
                total={total}
                count={count}
                color={color}
                topNode={
                  <div>
                    {text}({count}/{total})
                  </div>
                }
                rightNode={
                  <div>{((count / total) as any).toFixed(2) * 100}%</div>
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Demo;
