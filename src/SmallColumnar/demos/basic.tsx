/*
 * @Descripttion:
 * @Author: wll
 * @Date: 2021-03-09 11:11:33
 */
import React, { FC } from 'react';
import { SmallColumnar } from '@alitajs/charts';
import styles from './index.less';

const data = [
  {
    month: '01月',
    count: 12,
    color: 0,
  },
  {
    month: '02月',
    count: 34,
    color: 1,
  },
  {
    month: '03月',
    count: 26,
    color: 0,
  },
  {
    month: '04月',
    count: 75,
    color: 0,
  },
  {
    month: '05月',
    count: 23,
    color: 1,
  },
  {
    month: '06月',
    count: 44,
    color: 1, // 对应颜色的下标
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
          <SmallColumnar
            data={data}
            color={['#F36A3F', '#67CA83']}
            x="month"
            y="count"
            aliasColor="color"
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
