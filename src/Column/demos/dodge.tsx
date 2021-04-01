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

    { index: 1, city: '绵阳', attribute: '线索', number: 900 },
    { index: 1, city: '绵阳', attribute: '合同', number: 653 },

    { index: 2, city: '自贡', attribute: '线索', number: 620 },
    { index: 2, city: '自贡', attribute: '合同', number: 789 },

    { index: 3, city: '广元', attribute: '线索', number: 746 },
    { index: 3, city: '广元', attribute: '合同', number: 456 },

    { index: 4, city: '达州', attribute: '线索', number: 335 },
    { index: 4, city: '达州', attribute: '合同', number: 112 },

    { index: 5, city: '湖南', attribute: '线索', number: 222 },
    { index: 5, city: '湖南', attribute: '合同', number: 750 },

    { index: 6, city: '长沙', attribute: '线索', number: 485 },
    { index: 6, city: '长沙', attribute: '合同', number: 615 },

    { index: 7, city: '武汉', attribute: '线索', number: 711 },
    { index: 7, city: '武汉', attribute: '合同', number: 335 },
  ];

  return (
    <>
      <Column
        data={data}
        type="dodge"
        x="index"
        xName="city"
        y="number"
        yName="attribute"
        color={['attribute', ['#008EF9', '#FFBB22']]}
        colDefs={{
          index: {
            tickInterval: 1,
            min: -0.4,
            max: 3.1,
            range: [0, 0.89],
          },
        }}
      />
    </>
  );
};

export default DemoChart;
