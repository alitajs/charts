import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { Button, Divider } from 'antd';
import 'antd/dist/antd.css';
import { RightOutlined } from '@ant-design/icons';
import {
  Chart,
  Geometry,
  Tooltip,
  Legend,
  Coordinate,
  Axis,
  Guide,
  px2hd,
  PieLabel,
  getPercentage,
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
  type?: 'stack' | 'dodge' | 'noCoordinates';
  title?: string;
  /**
   * 副标题
   */
  subtitle?: string;
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
    subtitle,
    colDefs = {},
    x,
    xName = `${x}`,
    y,
    yName = `${y}`,
    color = [`${x}`, ['#008EF9', '#1DCFE8', '#FFBB22', '#C9D0E7']],
  } = props;
  if (!data) {
    return <p>data is undefined!</p>;
  }

  const isStack = type === 'stack';
  const isDodge = type === 'dodge';
  const isNoCoordinates = type === 'noCoordinates';
  let checked = data[0][xName];
  let attributeIndex = 0;
  const findAttributeTemp = data[0][x];
  const chartRef = useRef();

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
    if (isDodge) {
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
    if (isNoCoordinates) {
      setTimeout(() => {
        const { chart } = chartRef.current;
        data.forEach(function(obj) {
          chart.guide().text({
            limitInPlot: true,
            position: [obj[x], obj[y]],
            content: obj[y] + '单',
            style: {
              textBaseline: 'bottom',
              textAlign: 'center',
              fontSize: px2hd(30),
            },
          });
        });

        chart.repaint();
      }, 100);
    }
  }, []);

  return (
    <div
      style={{
        margin: '0.24rem',
        backgroundColor: '#FFF',
        borderRadius: '0.16rem',
        paddingBottom: '0.6rem',
      }}
    >
      {title && (
        <div
          style={{
            fontSize: '0.32rem',
            color: '#333333',
            padding: '0.32rem',
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      )}

      {isNoCoordinates && (
        <div
          style={{
            fontSize: '0.32rem',
            color: '#BABABA',
            padding: '0.32rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            height: '0.30rem',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              backgroundColor: '#008BFC',
              width: '0.12rem',
              height: '0.22rem',
              borderRadius: '0.06rem',
              marginRight: '0.15rem',
            }}
          ></div>

          {subtitle}
        </div>
      )}

      <Chart
        width={726}
        height={!isDodge ? 726 : 850}
        data={data}
        colDefs={colDefs}
        pixelRatio={window.devicePixelRatio}
        padding={
          isNoCoordinates
            ? [px2hd(120), px2hd(80), px2hd(120), px2hd(40)]
            : [px2hd(120), px2hd(80), px2hd(240), px2hd(120)]
        }
        ref={chartRef}
      >
        {isStack ? (
          <Geometry
            type="interval"
            position={`${x}*${y}`}
            color={[
              color[0],
              (attribute, xName) => {
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
                radius: at => {
                  const { chart } = chartRef.current;
                  const data = chart.get('geoms')[0]._attrs.data;
                  return at === data[data.length - 1].attribute
                    ? [px2hd(12), px2hd(12), 0, 0]
                    : null;
                },
              },
            ]}
          />
        ) : null}

        {isDodge ? (
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
        ) : null}

        {isNoCoordinates ? (
          <Geometry
            type="interval"
            position={`${x}*${y}`}
            color={color}
            size={px2hd(30)}
            style={[
              yName,
              {
                radius: [px2hd(15)],
              },
            ]}
          />
        ) : null}

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
        ) : null}

        {isDodge ? (
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
        ) : null}

        {isNoCoordinates ? <Legend disable /> : null}

        <Tooltip
          disable={!isStack}
          alwaysShow={true}
          custom={true} // 自定义 tooltip 内容框
          showTooltipMarker={false}
          onChange={obj => {
            const { chart } = chartRef.current;

            const legend = chart.get('legendController').legends.bottom[0];
            // console.log(legend)
            const tooltipItems = obj.items;

            const legendItems = legend.items;

            checked = tooltipItems[0].origin.city;

            const map: any = {};
            legendItems.forEach(function(item) {
              map[item.name] = _.clone(item);
            });
            let count = 0;
            tooltipItems.forEach(function(item) {
              const value = item.value * 1;
              count += value;
            });
            tooltipItems.forEach(function(item) {
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
          field={x}
          line={isNoCoordinates ? null : { top: false }}
          label={text => {
            return !isNoCoordinates
              ? {
                  fontSize: px2hd(30),
                  fill: '#AAAAAA',
                  text: data[text * attributeIndex].city,
                }
              : {
                  fontSize: px2hd(30),
                  fill: '#AAAAAA',
                };
          }}
          labelOffset={px2hd(30)}
        />

        <Axis
          enable={!isNoCoordinates}
          field={y}
          label={{
            fontSize: px2hd(30),
            fill: '#BABABA',
          }}
          labelOffset={px2hd(30)}
        />

        <Interaction disable={isNoCoordinates} field="pan" />

        <Interaction
          disable={!isStack}
          field="interval-select"
          selectAxis={false}
          cancelable={false}
          unSelectStyle={false}
          selectStyle={false}
          onEnd={ev => {
            setTimeout(() => {
              const { chart } = chartRef.current;
              chart.repaint();
              // console.log(111)
            }, 50);
          }}
        />
      </Chart>

      {isNoCoordinates && (
        <div style={{ textAlign: 'center' }}>
          <Button
            style={{ width: '90%', backgroundColor: '#F6F8FA', border: 'none' }}
          >
            查看详情
            <RightOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Donut;
