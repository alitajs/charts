import React, { FC, useState } from 'react';
import { Line } from '@alitajs/charts';
import classnames from 'classnames';
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

const menuData = [
  { label: '客户', id: '01' },
  { label: '线索', id: '02' },
  { label: '商机', id: '03' },
  { label: '合同', id: '04' },
  { label: '订单', id: '05' },
];
interface DemoProps {}

const Demo: FC<DemoProps> = props => {
  const [lineData, setLineData] = useState(data);
  const [activeId, setActiveId] = useState('01');
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
          <div className={styles.menuBox}>
            {menuData.map(item => {
              return (
                <div
                  className={classnames(styles.menuItem, {
                    [styles.menuActive]: item.id === activeId,
                  })}
                  key={item.id}
                  onClick={() => {
                    setActiveId(item.id);
                    const temData = data.map(item => {
                      return {
                        month: item.month,
                        count: Math.floor(Math.random() * 150),
                      };
                    });
                    setLineData(temData);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.lineHeader}>
          <div className={styles.cardHeader}>线索增长趋势</div>
          <div className={styles.right}>
            转化率：<span>37.41%</span>
          </div>
        </div>
        <div className={styles.cardBody}>
          <Line
            style={{ backgroundColor: '#fff' }}
            data={lineData}
            aliasPosition={{ x: 'month', y: 'count' }}
            lineColor="l(0) 0:#f40 0.5:#9f9 1:#f0f0f0"
            lineShadowColor="rgba(0,0,0,0.2)"
            areaColor="l(90) 0:#f40 1:#f0f0f0"
            axisLabelColor="#0089FF"
            axisGridColor="#0089FF"
            colDefs={{
              // month x轴字段名
              month: {
                //  x轴最小
                min: 1,
                // x轴 可视区域最大字段
                max: 5.3,
                // x轴步调，
                tickInterval: 1,
              },
            }}
            onRenderToolTips={onRenderToolTips}
            axisXLabel={(text: string) => `${text}月`}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
