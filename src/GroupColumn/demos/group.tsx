import React from 'react';
import { GroupColumn } from '@alitajs/charts';

export default () => {
  const data = [
    { name: '福州', line: 710, contract: 400, business: 300 },
    { name: '漳州', line: 500, contract: 230, business: 390 },
    { name: '厦门', line: 610, contract: 490, business: 310 },
    { name: '泉州', line: 840, contract: 410, business: 560 },
    { name: '三明', line: 830, contract: 400, business: 780 },
    { name: '莆田', line: 820, contract: 410, business: 290 },
    { name: '宁德', line: 810, contract: 490, business: 310 },
    { name: '南平', line: 810, contract: 490, business: 470 },
    { name: '龙岩', line: 810, contract: 490, business: 500 },
  ];

  return (
    <div>
      <GroupColumn
        data={data}
        title="卡片标题"
        x="name"
        legendParams={[
          { label: '线索', value: 'line' },
          { label: '合同', value: 'contract' },
          { label: '商机', value: 'business' },
        ]}
        color={['#5E5CE6', '#2689F4', '#E58A3C']}
        colDefs={{
          index: {
            tickInterval: 1,
            min: -0.4,
            max: 2.6,
            range: [0, 0.89],
          },
        }}
      />
    </div>
  );
};
