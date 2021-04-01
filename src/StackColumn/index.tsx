import React, { FC, useState, useEffect } from 'react';
import SumBy from 'lodash/sumBy';
import {
  Chart,
  px2hd,
  Geometry,
  Interaction,
  Axis,
  Legend,
  Tooltip,
  getPercentage,
} from '@alitajs/f2';
import { LegendItem } from '@antv/f2/types/Legend';
import {
  StackColumnProps,
  StackColumnLegendParamsProps,
  StackColumnDataProps,
} from './PropsType';

const COLOR_MENU = ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75'];

const SumObj = (obj: any, key: string) => {
  let sum = 0;
  Object.keys(obj).forEach(item => {
    if (item !== key) {
      sum += obj[item];
    }
  });
  return sum;
};

const StackColumn: FC<StackColumnProps> = props => {
  const {
    data,
    legendParams = [],
    x,
    color = COLOR_MENU,
    colDefs = {
      index: {
        tickInterval: 1,
        min: -0.4,
        max: 4.1,
        range: [0, 0.89],
      },
    },
    ...reset
  } = props;
  const [newData, setNewData] = useState<StackColumnDataProps[]>([]);
  const [currentName, setCurrentName] = useState<string | number>(''); // 当前展示的数据
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]); // 图例数据

  // let currentName: string | number = '';

  useEffect(() => {
    const dat: StackColumnDataProps[] = [];
    const legList = [] as LegendItem[];

    /**
     * 调整符合 antv 的数据结构
     */
    legendParams.forEach(
      (leg: StackColumnLegendParamsProps, legendIndex: number) => {
        data.forEach((item: any, index: number) => {
          dat.push({
            [x]: leg.label,
            x: item[x],
            y: item[leg.value],
            index,
          });
          // 设置初始化的 legend 值
          if (index === 0) {
            legList.push({
              name: leg?.label,
              marker: {
                symbol: 'circle',
                fill: color[legendIndex],
                radius: px2hd(8),
              },
              value: `${item[leg.value]}（${getPercentage(
                item[leg.value] / SumObj(item, x),
              )}%）`,
            });
          }
        });
      },
    );
    setLegendItems(legList);
    if (data && data.length) {
      setCurrentName(data[0][x]);
      // currentName = data[0][x];
    }
    setNewData(dat);
  }, [data]);

  if (!data) {
    return <p>data is undefined!</p>;
  }

  return (
    <div>
      <Chart
        data={newData}
        width={750}
        height={600}
        pixelRatio={window.devicePixelRatio}
        animate
        colDefs={colDefs}
        padding={[px2hd(60), px2hd(74), px2hd(200), px2hd(120)]}
        {...reset}
      >
        <Geometry
          type="interval"
          position="index*y"
          adjust={{
            type: 'stack',
          }}
          size={px2hd(44)}
          color={[
            `${x}*x`,
            (legName: string, name: string) => {
              const aa = legendParams.findIndex(leg => leg?.label === legName);
              if (name === currentName) {
                return color[aa];
              }
              return '#BEC5E0';
            },
          ]}
          style={[
            x,
            {
              radius: (sty: any) => {
                return sty === legendParams[legendParams.length - 1].label
                  ? [px2hd(8), px2hd(8), 0, 0]
                  : null;
              },
            },
          ]}
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
        <Legend
          items={legendItems}
          custom
          align="center"
          position="bottom"
          wordSpace={px2hd(12)}
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
          joinString="  "
          itemGap={px2hd(30)}
          itemMarginBottom={px2hd(24)}
        />
        <Tooltip
          triggerOn={['touchstart', 'touchmove']}
          custom
          showTooltipMarker={false}
          onChange={(e: any) => {
            const { chart, items } = e;
            const legend = chart.get('legendController')?.legends?.bottom[0];
            const legendItems = legend?.items;

            // 统计某个地区的总额
            const sum = SumBy(items, (o: any) => o?.origin?.y);

            // 设置图例的值
            legendItems.forEach((leg: any, index: number) => {
              leg.value = `${items[index].origin?.y}（${getPercentage(
                items[index].origin?.y / sum,
              )}%）`;
            });
            legend.setItems(legendItems);
            setCurrentName(items[0].origin?.x);

            // 设置柱状图的颜色
            const xName = items[0]?.origin?.x;
            const geom = chart.get('geoms')[0];
            const shapes = geom.get('shapes');
            shapes.forEach((shape: any) => {
              const itemOrigin = shape.get('origin');
              if (itemOrigin?._origin?.x === xName) {
                const index = legendParams.findIndex(
                  leg => leg?.label === itemOrigin?._origin[x],
                );
                shape.attr({
                  fill: color[index],
                });
                return;
              }
              shape.attr({
                fill: '#BEC5E0',
              });
            });
          }}
        />
      </Chart>
    </div>
  );
};

export default StackColumn;
