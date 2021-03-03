import React, { FC } from 'react';
import { MultipleProgress } from '@alitajs/charts';
import './index.less';

const prefixCls = 'my-demo';
interface DemoProps {}

const Demo: FC<DemoProps> = props => {
  const data = [
    { count: 20, color: '#F36A3F', label: '客户建档率' },
    { count: 50, color: '#0089FF', label: '线索转化率' },
    { count: 30, color: '#01BB7F', label: '商机转化率' },
  ];

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-progress`} style={{ marginTop: 30 }}>
        <div className={`${prefixCls}-title`}>卡片标题</div>
        <MultipleProgress data={data} />
      </div>
    </div>
  );
};

export default Demo;
