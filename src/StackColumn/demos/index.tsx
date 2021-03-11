import React from 'react';
import { StackColumn } from '@alitajs/charts';

export default () => {
  const data = [
    { city: '福州', line: 800, contract: 552, business: 485, order: 862 },
    { city: '漳州', line: 900, contract: 653, business: 450, order: 754 },
    { city: '厦门', line: 620, contract: 789, business: 238, order: 428 },
    { city: '泉州', line: 746, contract: 456, business: 874, order: 428 },
    { city: '三明', line: 335, contract: 112, business: 486, order: 579 },
    { city: '莆田', line: 335, contract: 335, business: 486, order: 579 },
    { city: '宁德', line: 335, contract: 335, business: 335, order: 335 },
    { city: '南平', line: 335, contract: 335, business: 335, order: 335 },
  ];
  return (
    <div>
      <StackColumn
        data={data}
        x="city"
        legendParams={[
          { label: '线索', value: 'line' },
          { label: '合同', value: 'contract' },
          { label: '商机', value: 'business' },
          { label: '订单', value: 'order' },
        ]}
        color={['#2689F4', '#5CCCE6', '#FCBF3C', '#BEC5E0']}
      />
    </div>
  );
};
