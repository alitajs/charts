---
title: 折线图
nav:
  title: 组件
  path: /components
---

### 折线图

### 基础用法

<code src="./demos/basic.tsx" />

### 修改配置

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

### LineAliasPositionProps

| 属性名 | 描述         | 类型   | 默认值 |
| ------ | ------------ | ------ | ------ |
| x      | x 轴字段名称 | string | date   |
| y      | y 轴字段名称 | string | value  |

### LineToolTipsViewProps

| 属性名   | 描述   | 类型            | 默认值   |
| -------- | ------ | --------------- | -------- |
| title    | 标题   | React.ReactNode | x 轴数据 |
| subTitle | 子标题 | React.ReactNode | y 轴数据 |
