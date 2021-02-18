---
title: alitajs/charts - 移动端的几个通用图表
order: 10
hero:
  title: alitajs/charts
  desc: 📖 移动端的几个通用图表
  actions:
    - text: 快速上手
      link: /api/chart
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 专注移动，体验优雅
    desc: 轻量化呈现，自然反馈 轻巧流畅 多端异构
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 图表丰富，组件完备
    desc: 与传统的图表库不同，抛弃了特图特做的封装思路，基于强大的图形语法理论，以数据驱动，通过图形语法的组合灵活构建各类图表，目前可绘制 50+ 图表类型（当然，还可以更多），覆盖各类场景 在提供基础的图表可视化能力外，我们还提供了丰富图表功能组件，满足各种功能需求。
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/b8570f4d-c1b1-45eb-a1da-abff53159967/kj9t990h_w144_h144.png
    title: 扩展灵活，创意无限
    desc: 我们在提供最佳实践的同时，还为开发者提供了灵活的扩展机制，包括 Shape、动画以及交互的自定义能力，当然还有图表样式的个性化定制，满足各种个性化的图表要求。
footer: Open-source MIT Licensed | Copyright © 2021-present<br />Powered by xiaohuoni
---

基于 [@alitajs/f2](https://github.com/alitajs/f2) 封装的图表组件。帮助你快速的在移动端项目中构建图表。

不支持自定义，只支持展示的几种用法，如果你需要自定义的组件，可以使用 [@alitajs/f2](https://github.com/alitajs/f2) 进行自定义。

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

![image](../image.webp)
