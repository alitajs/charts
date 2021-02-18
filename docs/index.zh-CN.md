---
title: alitajs/f2 - 支持react hooks 的 F2 图表组件库
order: 10
hero:
  title: alitajs/f2
  desc: 📖 支持react hooks 的 F2 图表组件库
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

基于 F2 封装的图表组件，支持 react hooks。帮助你快速的在移动端项目中构建图表。
完全准照 F2 的 API 封装，支持完全的图表自定义，但是其实在你的项目中，并不需要自定义图表。
我们通过对移动端的图表需求进行整理和构建，提供了一个常用的[图表库 @alitajs/charts](https://github.com/alitajs/f2)。
你可以优先使用[@alitajs/charts](https://github.com/alitajs/f2)快速实现你的需求。

## 用法

### 常规用法

```tsx
import React, { useState } from 'react';
import { Chart, Geometry } from '@alitajs/f2';

const ChartDemo = () => {
  const data = [
    { year: '1951', sales: 38 },
    { year: '1952', sales: 52 },
    { year: '1956', sales: 61 },
    { year: '1957', sales: 145 },
    { year: '1958', sales: 48 },
    { year: '1959', sales: 38 },
    { year: '1960', sales: 38 },
    { year: '1962', sales: 38 },
  ];
  return (
    <>
      <Chart width={750} height={400} data pixelRatio={window.devicePixelRatio}>
        <Geometry type="interval" position="year*sales" />
      </Chart>
    </>
  );
};

export default ChartDemo;
```

### react hooks 用法

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { useChart, useGeometry } from '@alitajs/f2';

const ChartDemo = () => {
  const data = [
    { year: '1951', sales: 38 },
    { year: '1952', sales: 52 },
    { year: '1956', sales: 61 },
    { year: '1957', sales: 145 },
    { year: '1958', sales: 48 },
    { year: '1959', sales: 38 },
    { year: '1960', sales: 38 },
    { year: '1962', sales: 38 },
  ];
  const [isXy, setIsXy] = useState(true);
  const elmRef = useRef<HTMLCanvasElement>(null);
  const { setContainer, container, chart } = useChart({
    container: elmRef.current as HTMLCanvasElement,
    width: 750,
    height: 400,
    data,
    pixelRatio: window.devicePixelRatio,
  });
  const { geometry } = useGeometry({
    type: 'interval',
    chart,
    position: 'year*sales',
  });

  useEffect(() => setContainer(elmRef.current as HTMLElement | undefined), [
    elmRef.current,
  ]);
  useEffect(() => {
    if (chart && geometry) {
      geometry.position(isXy ? 'year*sales' : 'sales*year');
      chart.repaint();
    }
  }, [isXy]);

  return (
    <>
      <button
        onClick={() => {
          setIsXy(!isXy);
        }}
      >
        两级反转
      </button>
      <canvas ref={elmRef} style={{ display: 'block' }} />
    </>
  );
};

export default ChartDemo;
```
