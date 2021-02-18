# @alitajs/f2

基于 F2 封装的图表组件，支持 react hooks。帮助你快速的在移动端项目中构建图表。
完全准照 F2 的 API 封装，支持完全的图表自定义，但是其实在你的项目中，并不需要自定义图表。
我们通过对移动端的图表需求进行整理和构建，提供了一个常用的[图表库 @alitajs/charts](https://github.com/alitajs/charts)。
你可以优先使用[@alitajs/charts](https://github.com/alitajs/charts)快速实现你的需求。

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
