# @alitajs/charts

基于 [@alitajs/f2](https://github.com/alitajs/f2) 封装的图表组件。帮助你快速的在移动端项目中构建图表。
不支持自定义，只支持展示的集中用法，如果你需要自定义的组件，可以使用 [@alitajs/f2](https://github.com/alitajs/f2) 进行自定义。

## 用法

### 常规用法

```tsx
import React, { useState } from 'react';
import { Donut } from '@alitajs/charts';

const ChartDemo = () => {
  const data = [
    {
      name: '余额',
      percent: 2423.0,
    },
    {
      name: '理财产品',
      percent: 423.0,
    },
    {
      name: '黄金',
      percent: 1223.0,
    },
    {
      name: '余额宝',
      percent: 1423.0,
    },
  ];
  return (
    <>
      <Donut
        data={data}
        title="卡片标题"
        type="table1"
        x="name"
        y="percent"
        sumText="5782.70"
        sumTitle="总资产"
      />
    </>
  );
};

export default ChartDemo;
```

![](https://alipic.lanhuapp.com/SketchCover83b5372339d8a2e9c2bf6768f91ef7f41999aa29fcf43f5012b1833184e26c0b?x-oss-process=image/quality,q_lossless/format,webp)
