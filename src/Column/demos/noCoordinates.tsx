import React, { useState } from 'react';
import { Column } from '@alitajs/charts';

interface ColumnProps {
  data: any[];
  type: 'stack' | 'dodge' | 'noCoordinates';
}
const DemoChart: React.FC<ColumnProps> = () => {
  const data = [
    { month: '04月', number: 15 },
    { month: '05月', number: 7 },
    { month: '06月', number: 11 },
    { month: '07月', number: 3 },
    { month: '08月', number: 13 },
    { month: '09月', number: 9 },
  ];

  return (
    <>
      <Column
        data={data}
        title="卡片标题"
        subtitle="副标题表述 (例如：近6月投诉情况分析)"
        type="noCoordinates"
        x="month"
        y="number"
        color={['month', ['#FF5E2C', '#33CD7C']]}
      />
    </>
  );
};

export default DemoChart;
