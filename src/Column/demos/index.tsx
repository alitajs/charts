import React, { useState } from 'react';
import { Column } from '@alitajs/charts';

interface ColumnProps {
  data: any[];
  type: 'stack' | 'dodge';
}
const DemoChart: React.FC<ColumnProps> = () => {
  const data = [
    { index: 0, city: '成都', attribute: '线索', number: 800 },
    { index: 0, city: '成都', attribute: '合同', number: 552 },
    { index: 0, city: '成都', attribute: '商机', number: 485 },
    { index: 0, city: '成都', attribute: '订单', number: 862 },

    { index: 1, city: '绵阳', attribute: '线索', number: 900 },
    { index: 1, city: '绵阳', attribute: '合同', number: 653 },
    { index: 1, city: '绵阳', attribute: '商机', number: 450 },
    { index: 1, city: '绵阳', attribute: '订单', number: 754 },

    { index: 2, city: '自贡', attribute: '线索', number: 620 },
    { index: 2, city: '自贡', attribute: '合同', number: 789 },
    { index: 2, city: '自贡', attribute: '商机', number: 238 },
    { index: 2, city: '自贡', attribute: '订单', number: 428 },

    { index: 3, city: '广元', attribute: '线索', number: 746 },
    { index: 3, city: '广元', attribute: '合同', number: 456 },
    { index: 3, city: '广元', attribute: '商机', number: 874 },
    { index: 3, city: '广元', attribute: '订单', number: 499 },

    { index: 4, city: '达州', attribute: '线索', number: 335 },
    { index: 4, city: '达州', attribute: '合同', number: 112 },
    { index: 4, city: '达州', attribute: '商机', number: 486 },
    { index: 4, city: '达州', attribute: '订单', number: 579 },

    { index: 5, city: '湖南', attribute: '线索', number: 335 },
    { index: 5, city: '湖南', attribute: '合同', number: 335 },
    { index: 5, city: '湖南', attribute: '商机', number: 335 },
    { index: 5, city: '湖南', attribute: '订单', number: 335 },

    { index: 6, city: '长沙', attribute: '线索', number: 335 },
    { index: 6, city: '长沙', attribute: '合同', number: 335 },
    { index: 6, city: '长沙', attribute: '商机', number: 335 },
    { index: 6, city: '长沙', attribute: '订单', number: 335 },

    { index: 7, city: '武汉', attribute: '线索', number: 335 },
    { index: 7, city: '武汉', attribute: '合同', number: 335 },
    { index: 7, city: '武汉', attribute: '商机', number: 335 },
    { index: 7, city: '武汉', attribute: '订单', number: 335 },
  ];

  return (
    <>
      <Column
        data={data}
        title="卡片标题"
        type="stack"
        x="index"
        xName="city"
        y="number"
        yName="attribute"
        color={['attribute*city', ['#008EF9', '#1DCFE8', '#FFBB22', '#C9D0E7']]}
        colDefs={{
          index: {
            tickInterval: 1,
            min: -0.5,
            max: 4.1,
            range: [0, 0.94],
          },
        }}
      />
    </>
  );
};

export default DemoChart;
