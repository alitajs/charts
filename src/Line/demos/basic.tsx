import React, { FC } from 'react';
import { Line } from '@alitajs/charts';
import styles from './index.less';

const data = [
  {
    month: 1,
    count: 12,
  },
  {
    month: 2,
    count: 34,
  },
  {
    month: 3,
    count: 26,
  },
  {
    month: 4,
    count: 75,
  },
  {
    month: 5,
    count: 23,
  },
  {
    month: 6,
    count: 44,
  },
  {
    month: 7,
    count: 56,
  },
  {
    month: 8,
    count: 20,
  },
  {
    month: 9,
    count: 62,
  },
  {
    month: 10,
    count: 34,
  },
  {
    month: 11,
    count: 98,
  },
  {
    month: 12,
    count: 103,
  },
];
interface DemoProps {}

const Demo: FC<DemoProps> = props => {
  const onRenderToolTips = (e: any) => {
    return {
      title: `${e.title}月`,
      subTitle: (
        <>
          <span
            style={{
              fontSize: '0.36rem',
              color: '#333',
              fontWeight: 500,
            }}
          >
            {e.value}
          </span>
          单
        </>
      ),
    };
  };
  return (
    <div className={styles.lineDemo}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.title}>卡片标题</div>
          <div className={styles.subtitle}>
            副标题描述（例如：近6月投诉情况分析）
          </div>
        </div>
        <div className={styles.cardBody}>
          <Line
            data={data}
            x="month"
            y="count"
            colDefs={{
              // month x轴字段名
              month: {
                //  x轴最小
                min: 1,
                // x轴 可视区域最大字段
                max: 6.2,
                // x轴步调，
                tickInterval: 1,
              },
            }}
            onRenderToolTips={onRenderToolTips}
            axisXLabel={(text: string) => `${text}月`}
          />
        </div>
      </div>

      <div className={styles.space}>小图形</div>
      <div style={{ width: '80vw', height: '65vw', margin: '0 auto' }}>
        <Line
          style={{ backgroundColor: '#fff' }}
          data={data}
          x="month"
          y="count"
          colDefs={{
            // month x轴字段名
            month: {
              //  x轴最小
              min: 1,
              // x轴 可视区域最大字段
              max: 6.2,
              // x轴步调，
              tickInterval: 1,
            },
          }}
          onRenderToolTips={onRenderToolTips}
          axisXLabel={(text: string) => `${text}月`}
        />
      </div>
    </div>
  );
};

export default Demo;
