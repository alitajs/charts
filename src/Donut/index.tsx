import React, { useRef, useEffect } from 'react';
import {
  Chart,
  Geometry,
  Tooltip,
  Legend,
  Coordinate,
  Axis,
  Guide,
  px2hd,
  F2,
} from '@alitajs/f2';
import _ from 'lodash';
import { ChartProps } from '@alitajs/f2/dist/Chart';
import '../style/index.less';

const { Util, G } = F2;
const { Group } = G;

const COLOR_MENU = ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75'];

interface DountProps {
  /**
   * 图表展示数据
   */
  data: ChartProps['data'];
  /**
   * 图表类型
   * @default normal
   */
  type?: 'normal' | 'table';
  /**
   * 标题
   */
  title?: string;
  /**
   * 对数据进行单属性过滤，比如展示数值加上单位
   */
  colDefs?: ChartProps['colDefs'];
  /**
   * 图表取得横纵属性值，如x*y
   */
  x: string;
  /**
   * 图表取得横纵属性值，如x*y
   */
  y: string;
  /**
   * 自定义图表颜色，若超过5个颜色，需要自行定义
   * @default ['name', ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75']]
   */
  color?: any[];
  /**
   * 图表中央显示数字
   */
  sumText?: string;
  /**
   * 图表中央显示文字
   */
  sumTitle?: string;
  /**
   * 表格自定义标题
   * @default ['分类', '占比', '数量']
   */
  tableHeader?: string[];
}

function drawLabel(
  shape: any,
  coord: any,
  canvas: any,
  resX: string,
  resY: string,
  total: any,
) {
  var center = coord.center;
  var origin = shape.get('origin');
  var points = origin.points;
  var x1 = (points[2].x - points[1].x) * 0.75 + points[1].x;
  var x2 = (points[2].x - points[1].x) * 1.8 + points[1].x;
  var y = (points[0].y + points[1].y) / 2;
  var point1 = coord.convertPoint({
    x: x1,
    y: y,
  });
  var point2 = coord.convertPoint({
    x: x2,
    y: y,
  });

  var group = new Group();
  group.addShape('Line', {
    attrs: {
      x1: point1.x,
      y1: point1.y,
      x2: point2.x,
      y2: point2.y,
      stroke: '#5E5CE6',
    },
  });

  var text = group.addShape('Text', {
    attrs: {
      x: point2.x,
      y: point2.y,
      text:
        origin._origin[resX] +
        ' ' +
        (origin._origin[resY] / total).toFixed(2) +
        '%',
      fill: '#5E5CE6',
      fontSize: px2hd(24),
      textAlign: 'start',
      textBaseline: 'bottom',
    },
  });
  var textWidth = text.getBBox().width;
  var baseLine = group.addShape('Line', {
    attrs: {
      x1: point2.x,
      y1: point2.y,
      x2: point2.x,
      y2: point2.y,
      stroke: '#5E5CE6',
    },
  });
  if (point2.x > center.x) {
    baseLine.attr('x2', point2.x + textWidth);
  } else if (point2.x < center.x) {
    text.attr('textAlign', 'end');
    baseLine.attr('x2', point2.x - textWidth);
  } else {
    text.attr('textAlign', 'center');
    text.attr('textBaseline', 'top');
  }
  canvas.add(group);
  shape.label = group;
}

const Donut: React.FC<DountProps> = props => {
  const chartRef = useRef();

  let lastClickedShape: any = undefined;

  const {
    data,
    type = 'normal',
    title,
    colDefs = {},
    x,
    y,
    color = [`${x}`, COLOR_MENU],
    sumText,
    sumTitle = '',
    tableHeader = ['分类', '占比', '数量'],
  } = props;

  const legendItems = data.map((obj, index) => {
    return {
      name: obj[x],
      value: obj[y].toFixed(2),
      marker: {
        symbol: 'circle',
        fill: color[1][index],
        radius: px2hd(8),
      },
    };
  });

  const total = data.reduce((acc, cur) => {
    if (typeof acc === 'number') {
      return parseFloat(acc) + parseFloat(cur[y]);
    }
    return cur[y] + acc[y];
  }) as any;

  const isTableLegend = type === 'table';
  if (!data) {
    return <p>data is undefined!</p>;
  }
  const map = {} as any;
  const newdate = data.map(function(obj) {
    map[obj[x]] = obj[y];
    return { ...obj, a: '1' };
  });
  const htmlStr = `<div style="width: 2.5rem;height: 0.4rem;text-align: center;">
  <div style="font-size: 0.42rem;color:#333333;font-weight: bold;word-break: break-all;">${sumText}</div>
  <div style="font-size: 0.24rem;color:#999999;">${sumTitle}</div>
</div>`;

  /**
   * 图例表格点击事件
   */
  const tableClick = (res: any) => {
    const { chart } = chartRef.current as any;
    var canvas = chart.get('canvas');
    var coord = chart.get('coord');
    var geom = chart.get('geoms')[0];
    var container = geom.get('container');
    var shapes = geom.get('shapes'); // 只有带精细动画的 geom 才有 shapes 这个属性

    let clickedShape: any;
    Util.each(shapes, (shape: any) => {
      var origin = shape.get('origin');
      if (origin && origin._origin.name === res[x]) {
        clickedShape = shape;
        return false;
      }
    });
    if (lastClickedShape) {
      lastClickedShape
        .animate()
        .to({
          attrs: {
            lineWidth: 0,
          },
          duration: 200,
        })
        .onStart(function() {
          if (lastClickedShape.label) {
            lastClickedShape.label.hide();
          }
        })
        .onEnd(function() {
          lastClickedShape.set('selected', false);
        });
    }

    if (clickedShape.get('selected')) {
      clickedShape
        .animate()
        .to({
          attrs: {
            lineWidth: 0,
          },
          duration: 200,
        })
        .onStart(function() {
          if (clickedShape.label) {
            clickedShape.label.hide();
          }
        })
        .onEnd(function() {
          clickedShape.set('selected', false);
        });
    } else {
      var color = clickedShape.attr('fill');
      clickedShape
        .animate()
        .to({
          attrs: {
            lineWidth: 10,
          },
          duration: 350,
          easing: 'bounceOut',
        })
        .onStart(function() {
          clickedShape.attr('stroke', color);
          clickedShape.set('zIndex', 1);
          container.sort();
        })
        .onEnd(function() {
          clickedShape.set('selected', true);
          clickedShape.set('zIndex', 0);
          container.sort();
          lastClickedShape = clickedShape;
          if (clickedShape.label) {
            clickedShape.label.show();
          } else {
            drawLabel(clickedShape, coord, canvas, x, y, total);
          }
          canvas.draw();
        });
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '0.16rem',
        paddingBottom: '0.6rem',
      }}
    >
      {title && <div className="alitajs-title">{title}</div>}
      <div>
        <Chart
          width={750}
          height={isTableLegend ? 500 : 650}
          data={newdate}
          colDefs={colDefs}
          pixelRatio={window.devicePixelRatio}
          ref={chartRef as any}
        >
          <Tooltip disable />
          <Legend
            disable={isTableLegend}
            custom={true}
            position="bottom"
            align="center"
            wordSpace={px2hd(18)}
            itemMarginBottom={px2hd(36)}
            itemGap={px2hd(150)}
            itemWidth={px2hd(240)}
            nameStyle={{
              fontSize: px2hd(30), // 文本大小
              fill: '#999',
            }}
            joinString=" "
            titleStyle={{
              textAlign: 'start',
            }}
            valueStyle={{
              fill: '#333', // 文本的颜色
              fontSize: px2hd(30), // 文本大小
              lineHeight: 34,
            }}
            items={legendItems}
            onClick={(ev: any) => {
              const { chart } = chartRef.current as any;
              var clickedItem = ev.clickedItem;
              var dataName = clickedItem.get('name');
              var canvas = chart.get('canvas');
              var coord = chart.get('coord');
              var geom = chart.get('geoms')[0];
              var container = geom.get('container');
              var shapes = geom.get('shapes'); // 只有带精细动画的 geom 才有 shapes 这个属性
              let clickedShape: any;
              Util.each(shapes, (shape: any) => {
                var origin = shape.get('origin');
                if (origin && origin._origin.name === dataName) {
                  clickedShape = shape;
                  return false;
                }
              });
              if (lastClickedShape) {
                lastClickedShape
                  .animate()
                  .to({
                    attrs: {
                      lineWidth: 0,
                    },
                    duration: 200,
                  })
                  .onStart(function() {
                    if (lastClickedShape.label) {
                      lastClickedShape.label.hide();
                    }
                  })
                  .onEnd(function() {
                    lastClickedShape.set('selected', false);
                  });
              }
              if (clickedShape.get('selected')) {
                clickedShape
                  .animate()
                  .to({
                    attrs: {
                      lineWidth: 0,
                    },
                    duration: 200,
                  })
                  .onStart(function() {
                    if (clickedShape.label) {
                      clickedShape.label.hide();
                    }
                  })
                  .onEnd(function() {
                    clickedShape.set('selected', false);
                  });
              } else {
                var color = clickedShape.attr('fill');
                clickedShape
                  .animate()
                  .to({
                    attrs: {
                      lineWidth: 10,
                    },
                    duration: 350,
                    easing: 'bounceOut',
                  })
                  .onStart(function() {
                    clickedShape.attr('stroke', color);
                    clickedShape.set('zIndex', 1);
                    container.sort();
                  })
                  .onEnd(function() {
                    clickedShape.set('selected', true);
                    clickedShape.set('zIndex', 0);
                    container.sort();
                    lastClickedShape = clickedShape;
                    if (clickedShape.label) {
                      clickedShape.label.show();
                    } else {
                      drawLabel(clickedShape, coord, canvas, x, y, total);
                    }
                    canvas.draw();
                  });
              }
            }}
          />
          <Coordinate
            type="polar"
            transposed
            innerRadius={0.75}
            radius={0.75}
          />
          <Axis disable />
          <Geometry
            type="interval"
            position={`a*${y}`}
            color={color}
            adjust="stack"
            size={px2hd(60)}
          />
          <Guide type="html" position={['50%', '45%']} html={htmlStr} />
        </Chart>
        {isTableLegend && (
          <div className="alitajs-donut-table">
            <div className="alitajs-donut-table-header">
              <div className="alitajs-donut-table-header-type">
                {tableHeader[0]}
              </div>
              <div className="alitajs-donut-table-header-ratio">
                {tableHeader[1]}
              </div>
              <div className="alitajs-donut-table-header-num">
                {tableHeader[2]}
              </div>
            </div>
            <div>
              {data.map((item, index: number) => (
                <div
                  className="alitajs-donut-table-body"
                  key={item[x]}
                  onClick={() => tableClick(item)}
                >
                  <div className="alitajs-donut-table-body-type">
                    <div
                      className="alitajs-donut-table-dot"
                      style={{ backgroundColor: color[1][index] }}
                    />
                    {item[x]}
                  </div>
                  <div className="alitajs-donut-table-body-ratio">
                    {`${((parseInt(item[y], 10) / total) * 100).toFixed(0)}%`}
                  </div>
                  <div className="alitajs-donut-table-body-num">{item[y]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donut;
