import React, { useState } from 'react';
import { GroupColumn } from '@alitajs/charts';

export default () => {
  // const data = [
  //   { name: '福州', line: 710, contract: 700 },
  //   { name: '漳州', line: 500, contract: 230 },
  //   { name: '厦门', line: 610, contract: 490 },
  //   { name: '泉州', line: 840, contract: 410 },
  //   { name: '三明', line: 830, contract: 400 },
  //   { name: '莆田', line: 820, contract: 410 },
  //   { name: '宁德', line: 810, contract: 490 },
  //   { name: '南平', line: 810, contract: 490 },
  //   { name: '龙岩', line: 810, contract: 490 },
  // ];

  const [data, setdata] = useState([
    { name: '福州', line: 710, contract: 700 },
    { name: '漳州', line: 500, contract: 230 },
    { name: '厦门', line: 610, contract: 490 },
    { name: '泉州', line: 840, contract: 410 },
    { name: '三明', line: 830, contract: 400 },
    { name: '莆田', line: 820, contract: 410 },
    { name: '宁德', line: 810, contract: 490 },
    { name: '南平', line: 810, contract: 490 },
    { name: '龙岩', line: 810, contract: 490 },
  ]);

  return (
    <div>
      <GroupColumn
        data={data}
        title="卡片标题"
        x="name"
        legendParams={[
          { label: '线索', value: 'line' },
          { label: '合同', value: 'contract' },
        ]}
        color={['#2689F4', '#FCBF3C']}
      />
      <div
        onClick={() => {
          setdata([]);
          setdata([
            { name: '福州', line: 100, contract: 300 },
            { name: '漳州', line: 200, contract: 400 },
            { name: '厦门', line: 610, contract: 490 },
            { name: '宁德', line: 810, contract: 490 },
            { name: '南平', line: 810, contract: 490 },
            { name: '龙岩', line: 810, contract: 490 },
          ]);
        }}
      >
        asaoaooaaoaj
      </div>
    </div>
  );
};
