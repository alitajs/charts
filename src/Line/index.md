---
title: 折线图
group:
  title: 折线图
nav:
  title: 组件
  path: /components
---

### 折线图

<code src="./demos/basic.tsx" />

### 彩色折线图

<code src="./demos/index.tsx" />

<API/>

### LineCanvasSizeProps

| 属性名 | 描述         | 类型             | 默认值 |
| ------ | ------------ | ---------------- | ------ |
| width  | 画布容器宽度 | string \| number | 100%   |
| height | 画布容器高度 | string \| number | 100%   |

### LineChoiceProps

| 属性名 | 描述     | 类型             | 默认值 |
| ------ | -------- | ---------------- | ------ |
| title  | x 轴数据 | string \| number | -      |
| value  | y 轴数据 | string \| number | -      |

### LineToolTipsViewProps

| 属性名   | 描述   | 类型            | 默认值   |
| -------- | ------ | --------------- | -------- |
| title    | 标题   | React.ReactNode | x 轴数据 |
| subTitle | 子标题 | React.ReactNode | y 轴数据 |
