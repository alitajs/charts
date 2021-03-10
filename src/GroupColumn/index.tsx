import React, { FC, useEffect, useState } from 'react';
import {
  Chart,
  Geometry,
  Legend,
  px2hd,
  Axis,
  Interaction,
  Guide,
} from '@alitajs/f2';
import { ChartProps } from '@alitajs/f2/dist/Chart';
import {
  GroupColumnDataProps,
  GroupColumnLegendParamsProps,
} from './PropsType';

const COLOR_MENU = ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75'];

interface GroupColumnProps {
  /**
   * 图表展示数据
   */
  data: GroupColumnDataProps[];
  /**
   * 标题
   */
  x: string;
  /**
   * 图例内容
   */
  legendParams: GroupColumnLegendParamsProps[];
  /**
   * 颜色列表
   * @default ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75']
   */
  color?: string[];
  /**
   * 对数据进行单属性过滤，比如展示数值加上单位
   * @default
   * {
   * index: {
        tickInterval: 1,
        min: -0.4,
        max: 3.1,
        range: [0, 0.89],
      }}
   */
  colDefs?: ChartProps['colDefs'];
  /**
   * 数值范围为 0 至 1，用于调整分组中各个柱子的间距
   * @default 0.3
   */
  marginRatio?: number;
  /**
   * 是否展示柱状图上的文本
   * @default true
   */
  showGuide?: boolean;
}

const GroupColumn: FC<GroupColumnProps> = props => {
  const [newData, setNewData] = useState<GroupColumnDataProps[]>([]);
  const {
    data,
    x,
    legendParams = [],
    color = COLOR_MENU,
    colDefs = {
      index: {
        tickInterval: 1,
        min: -0.4,
        max: 3.1,
        range: [0, 0.89],
      },
    },
    marginRatio = 0.3,
    showGuide = true,
  } = props;

  useEffect(() => {
    const dat: GroupColumnDataProps[] = [];

    // 柱形图排列规则是按中心点两边排列，左右对称。如果其他地方也有用到这个方法，可以移动到 alitajs/f2 中
    const getOffsetX = (index: number, length: number): number => {
      const size = 40 / length;
      const m = index + 1;
      let offsetX = 0;
      let c = Math.ceil(length / 2);
      if (length % 2 === 0) {
        // 偶数列 2
        if (m > c) {
          // 右侧
          offsetX = (m - c) * (m - 1) * size;
          return offsetX;
        } else {
          offsetX = (c - m + 1) * (length - m) * size;
          return -offsetX;
        }
      } else {
        // 奇数列
        if (m === c) return 0;
        if (m > c) {
          // 右侧
          offsetX = (m - c + 1) * (m - 1) * size;
          return offsetX;
        } else {
          offsetX = (c - m + 1) * (length - m) * size - size / 2;
          return -offsetX;
        }
      }
    };

    /**
     * 调整符合 antv 的数据结构
     */
    legendParams.forEach(
      (leg: GroupColumnLegendParamsProps, legendIndex: number) => {
        data.forEach((item: GroupColumnDataProps, index: number) => {
          dat.push({
            name: leg.label,
            x: item[x],
            y: item[leg.value],
            index,
            offsetX: getOffsetX(legendIndex, legendParams.length),
          });
        });
      },
    );
    setNewData(dat);
  }, [data]);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '0.16rem',
        paddingBottom: '0.6rem',
      }}
    >
      <Chart
        data={newData}
        width={750}
        height={500}
        pixelRatio={window.devicePixelRatio}
        animate
        colDefs={colDefs}
        padding={[px2hd(120), px2hd(74), px2hd(60), px2hd(120)]}
      >
        <Geometry
          type="interval"
          position="index*y"
          adjust={{
            type: 'dodge',
            marginRatio,
          }}
          size={px2hd(80 / legendParams.length)}
          color={['name', color]}
          style={{
            radius: [px2hd(8), px2hd(8), 0, 0],
          }}
        />
        <Legend
          marker={{
            symbol: 'circle', // marker 的形状
            radius: px2hd(8), // 半径大小
          }}
          wordSpace={px2hd(10)}
          nameStyle={{
            fill: '#999999', // 文本的颜色
            fontSize: px2hd(24), // 文本大小
            textBaseline: 'middle', // 文本基准线，可取 top middle bottom，默认为middle
            lineHeight: px2hd(34),
          }}
          valueStyle={{
            fill: '#333', // 文本的颜色
            fontSize: px2hd(24), // 文本大小
            textBaseline: 'middle', // 文本基准线，可取 top middle bottom，默认为middle
            lineHeight: px2hd(34),
          }}
          itemWidth={px2hd(200)}
          offsetX={px2hd(50)}
          offsetY={px2hd(20)}
        />
        <Axis
          field="index"
          label={(text: string) => {
            return {
              fontSize: px2hd(30),
              fill: '#999999',
              lineHeight: px2hd(34),
              text: newData[parseInt(text, 10)].x,
            };
          }}
          line={{
            lineWidth: px2hd(2),
          }}
          labelOffset={px2hd(30)}
        />
        <Axis
          field="y"
          label={{
            fontSize: px2hd(30),
            fill: '#999999',
            lineHeight: px2hd(34),
          }}
          grid={{
            lineWidth: px2hd(2),
            fill: '#999',
          }}
          labelOffset={px2hd(30)}
        />
        <Interaction field="pan" />
        {showGuide &&
          newData?.map(item => (
            <Guide
              key={`${item.index}${item.offsetX}`}
              type="text"
              limitInPlot={true}
              style={{
                textBaseline: 'bottom',
                textAlign: 'center',
                fontSize: px2hd(24),
              }}
              content={item?.y}
              position={[item?.index, item?.y]}
              offsetY={px2hd(-10)}
              offsetX={px2hd(item?.offsetX as number)}
            />
          ))}
      </Chart>
    </div>
  );
};

export default GroupColumn;
