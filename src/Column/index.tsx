import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import {
  Chart,
  Geometry,
  Tooltip,
  Legend,
  Axis,
  px2hd,
  Interaction,
} from '@alitajs/f2';
import { ChartProps } from '@alitajs/f2/dist/Chart';

interface ColumnProps {
  /**
   * 图表展示数据
   */
  data: ChartProps['data'];
  /**
   * 图表类型
   * @default stack
   */
  type?: 'stack' | 'dodge';
  title?: string;
  /**
   * 对数据进行单属性过滤，比如展示数值加上单位
   */
  colDefs?: ChartProps['colDefs'];
  /**
   * 图表取得横纵属性值，如x*y
   */
  position: string;
  x: string;
  /**
   * 横坐标替代属性名称
   */
  xName?: string;
  y: string;
  /**
   * 纵坐标层叠|多柱属性名
   */
  yName?: string;
  /**
   * 自定义图表颜色
   * @default ['x', ['#008EF9', '#1DCFE8', '#FFBB22', '#C9D0E7']]
   */
  color?: any[];
}
const Donut: React.FC<ColumnProps> = props => {
  const {
    data,
    type = 'stack',
    title,
    colDefs = {},
    x,
    xName = `${x}`,
    y,
    yName = `${y}`,
    color = [`${x}`, ['#008EF9', '#1DCFE8', '#FFBB22', '#C9D0E7']],
    ...reset
  } = props;
  if (!data) {
    return <p>data is undefined!</p>;
  }
  const isStack = type === 'stack';

  let checked = data[0][xName];
  let attributeIndex = 0;
  const findAttributeTemp = data[0][x];
  const chartRef = useRef<any>();

  data.map(cur => {
    if (cur[x] === findAttributeTemp) attributeIndex += 1;
  });

  useEffect(() => {
    if (isStack) {
      setTimeout(() => {
        const item = data[0]; // 要展示 tooltip 的数据
        const { chart } = chartRef.current;
        const point = chart.getPosition(item); // 获取该数据的画布坐标
        chart.showTooltip(point); // 展示该点的 tooltip
      }, 100);
    }
    if (!isStack) {
      setTimeout(() => {
        const { chart } = chartRef.current;
        data.forEach(function(obj) {
          let offsetX = 0;
          if (obj.attribute === data[0][yName]) {
            offsetX = -px2hd(30);
          } else if (obj.attribute === data[1][yName]) {
            offsetX = px2hd(30);
          }
          chart.guide().text({
            limitInPlot: true,
            position: [obj[x], obj[y]],
            content: obj[y],
            style: {
              textBaseline: 'bottom',
              textAlign: 'center',
              fontSize: px2hd(30),
            },
            // offsetY: -2,
            offsetX,
          });
        });
        chart.repaint();
      }, 100);
    }
  }, []);

  return (
    <div>
      <Chart
        width={726}
        height={isStack ? 726 : 850}
        data={data}
        colDefs={colDefs}
        pixelRatio={window.devicePixelRatio}
        padding={[px2hd(120), px2hd(80), px2hd(240), px2hd(120)]}
        ref={chartRef}
        {...reset}
      >
        {isStack ? (
          <Geometry
            type="interval"
            position={`${x}*${y}`}
            color={[
              color[0],
              (attribute: any, xName: any) => {
                for (let i = 0; i < attributeIndex; i++) {
                  if (attribute === data[i][yName]) {
                    if (xName !== checked) {
                      return color[1][attributeIndex - 1];
                    } else {
                      return color[1][i];
                    }
                  } else {
                    continue;
                  }
                }
              },
            ]}
            adjust={type}
            size={px2hd(60)}
            style={[
              yName,
              {
                radius: (at: any) => {
                  const { chart } = chartRef.current;
                  const data = chart.get('geoms')[0]._attrs.data;
                  return at === data[data.length - 1].attribute
                    ? [px2hd(12), px2hd(12), 0, 0]
                    : null;
                },
              },
            ]}
          />
        ) : (
          <Geometry
            type="interval"
            position={`${x}*${y}`}
            color={color}
            adjust={type}
            size={px2hd(50)}
            style={[
              yName,
              {
                radius: [px2hd(8), px2hd(8), 0, 0],
              },
            ]}
          />
        )}

        {isStack ? (
          <Legend
            position="bottom"
            // offsetX={px2hd(60)}
            wordSpace={px2hd(18)}
            itemMarginBottom={px2hd(36)}
            joinString=" "
            itemGap={px2hd(150)}
            itemWidth={px2hd(240)}
            nameStyle={{
              fontSize: px2hd(30),
              fill: '#AAA',
            }}
            marker={{
              symbol: 'circle',
              radius: px2hd(8),
            }}
            // clickable: false,
            valueStyle={{
              // fill: '#404040', // 文本的颜色
              fontSize: px2hd(30), // 文本大小
              // lineHeight: 20
            }}
          />
        ) : (
          <Legend
            clickable={false}
            wordSpace={px2hd(18)}
            itemWidth={px2hd(120)}
            nameStyle={{
              fontSize: px2hd(30),
              fill: '#AAA',
            }}
            marker={{
              symbol: 'circle',
              radius: px2hd(8),
            }}
          />
        )}

        <Tooltip
          disable={!isStack}
          alwaysShow={true}
          custom={true} // 自定义 tooltip 内容框
          showTooltipMarker={false}
          onChange={(obj: any) => {
            const { chart } = chartRef.current;

            const legend = chart.get('legendController').legends.bottom[0];
            // console.log(legend)
            const tooltipItems = obj.items;

            const legendItems = legend.items;

            checked = tooltipItems[0].origin.city;

            const map: any = {};
            legendItems.forEach(function(item: any) {
              map[item.name] = _.clone(item);
            });
            let count = 0;
            tooltipItems.forEach(function(item: any) {
              const value = item.value * 1;
              count += value;
            });
            tooltipItems.forEach(function(item: any) {
              const name = item.name;
              const value = item.value;
              const percent = ((value / count) * 100).toFixed(0);
              if (map[name]) {
                map[name].value = value + ' (' + percent + '%)';
              }
              for (let i = 0; i < attributeIndex - 1; i++) {
                if (name === data[i][yName]) {
                  map[name].marker.fill = color[1][i];
                }
              }
            });
            legend.setItems(_.values(map));
          }}
        />

        <Axis
          field="index"
          label={(text: any) => {
            return {
              fontSize: px2hd(30),
              fill: '#AAAAAA',
              text: data[text * attributeIndex].city,
            };
          }}
          labelOffset={px2hd(30)}
        />

        <Axis
          field="number"
          label={{
            fontSize: px2hd(30),
            fill: '#BABABA',
          }}
          labelOffset={px2hd(30)}
        />

        <Interaction field="pan" />

        <Interaction
          disable={!isStack}
          field="interval-select"
          selectAxis={false}
          cancelable={false}
          unSelectStyle={false}
          selectStyle={false}
          onEnd={() => {
            setTimeout(() => {
              const { chart } = chartRef.current;
              chart.repaint();
              // console.log(111)
            }, 50);
          }}
        />
      </Chart>
    </div>
  );
};

export default Donut;
