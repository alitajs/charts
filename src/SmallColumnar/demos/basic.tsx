/*
 * @Descripttion:
 * @Author: wll
 * @Date: 2021-03-12 09:21:14
 */
import React, { FC } from 'react';
import { SmallColumnar } from '@alitajs/charts';
import styles from './index.less';

const data = [
  {
    month: '1月',
    count: 12,
    color: '#F36A3F',
  },
  {
    month: '2月',
    count: 34,
    color: '#A36A3F',
  },
  {
    month: '3月',
    count: 26,
    color: 'red',
  },
  {
    month: '04月',
    count: 75,
    color: '#67CA83',
  },
  {
    month: '05月',
    count: 23,
  },
  {
    month: '06月',
    count: 44,
    color: '#67CA83', // 对应颜色的下标
  },
];
interface DemoProps {}

const Demo: FC<DemoProps> = props => {
  return (
    <div className={styles.smallColumnarDemo}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.title}>卡片标题</div>
        </div>
        <div className={styles.cardBody}>
          <SmallColumnar data={data} x="month" y="count" />
        </div>
      </div>
    </div>
  );
};

export default Demo;
