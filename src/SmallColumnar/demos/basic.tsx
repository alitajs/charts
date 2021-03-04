import React, { FC } from 'react';
import { SmallColumnar } from '@alitajs/charts';
import styles from './index.less';

const data = [
  {
    month: '01月',
    count: 12,
    colorIndex: 0,
  },
  {
    month: '02月',
    count: 34,
    colorIndex: 1,
  },
  {
    month: '03月',
    count: 26,
    colorIndex: 0,
  },
  {
    month: '04月',
    count: 75,
    colorIndex: 0,
  },
  {
    month: '05月',
    count: 23,
    colorIndex: 1,
  },
  {
    month: '06月',
    count: 44,
    colorIndex: 1,
  },
];
interface DemoProps {}

const Demo: FC<DemoProps> = props => {
  return (
    <div className={styles.demo}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.title}>卡片标题</div>
        </div>
        <div className={styles.cardBody}>
          <SmallColumnar
            data={data}
            aliasPosition={{ x: 'month', y: 'count', c: 'colorIndex' }}
            color={['#F36A3F', '#67CA83']}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
