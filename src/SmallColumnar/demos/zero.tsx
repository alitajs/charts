/*
 * @Descripttion:
 * @Author: wll
 * @Date: 2021-03-12 09:21:14
 */
import React, { FC } from 'react';
import { ZeroColumn } from '@alitajs/charts';
import styles from './index.less';

const data = [
  {
    month: '01月',
    count: '1200',
  },
  {
    month: '02月',
    count: 3,
  },
  {
    month: '03月',
    count: 262,
  },
  {
    month: '04月',
    count: 75,
  },
  {
    month: '05月',
    count: 23,
  },
  {
    month: '06月',
    count: 44,
  },
  {
    month: '07月',
    count: 34,
  },
  {
    month: '08月',
    count: 26,
  },
  {
    month: '09月',
    count: 75,
  },
  {
    month: '10月',
    count: 23,
  },
  {
    month: '11月',
    count: 44,
  },
  {
    month: '12月',
    count: 44,
  },
  {
    month: '13月',
    count: 12,
  },
  {
    month: '14月',
    count: 34,
  },
  {
    month: '15月',
    count: 26,
  },
  {
    month: '16月',
    count: 75,
  },
  {
    month: '17月',
    count: 23,
  },
  {
    month: '18月',
    count: 44,
  },
  {
    month: '19月',
    count: 34,
  },
  {
    month: '23月',
    count: 26,
  },
  {
    month: '24月',
    count: 75,
  },
  {
    month: '20月',
    count: 75,
  },
  {
    month: '21月',
    count: 44,
  },
  {
    month: '22月',
    count: 44,
  },
  {
    month: '23月',
    count: 23,
  },
  {
    month: '24月',
    count: 44,
  },
  {
    month: '25月',
    count: 34,
  },
  {
    month: '26月',
    count: 26,
  },
  {
    month: '27月',
    count: 75,
  },
  {
    month: '28月',
    count: 23,
  },
  {
    month: '29月',
    count: 44,
  },
  {
    month: '30月',
    count: 44,
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
          <ZeroColumn
            data={data}
            showGuide
            showToolTips={false}
            x="month"
            y="count"
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
