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
import { GroupColumnDataProps, GroupColumnLegendListProps } from './PropsType';
import './index.less';

const prefixCls = 'alitajs-charts';

const COLOR_MENU = ['#5E5CE6', '#2689F4', '#E58A3C', '#F36A3F', '#4DCB75'];

interface GroupColumnProps {
  /**
   * 图表展示数据
   */
  data: GroupColumnDataProps[];
  /**
   * 标题
   */
  title: string;
  /**
   * 图表取得横纵属性值，如x*y
   */
  x: string;
  /**
   * 图例内容
   */
  legendList: GroupColumnLegendListProps[];
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
   * guide 自定义属性
   */
  guide?: any;
}

const GroupColumn: FC<GroupColumnProps> = props => {
  const [newData, setNewData] = useState<GroupColumnDataProps[]>([]);
  const {
    data,
    x,
    legendList = [],
    color = COLOR_MENU,
    title,
    colDefs = {
      index: {
        tickInterval: 1,
        min: -0.4,
        max: 3.1,
        range: [0, 0.89],
      },
    },
    guide,
  } = props;

  useEffect(() => {
    const dat: GroupColumnDataProps[] = [];
    legendList.forEach(leg => {
      data.forEach((item, index) => {
        dat.push({
          name: leg.value,
          x: item[x],
          y: item[leg.value],
          index,
        });
      });
    });
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
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <Chart
        data={newData}
        width={750}
        height={750}
        pixelRatio={window.devicePixelRatio}
        animate
        colDefs={colDefs}
        padding={[px2hd(120), px2hd(80), px2hd(240), px2hd(120)]}
      >
        <Geometry
          type="interval"
          position="index*y"
          adjust={{
            type: 'dodge',
            marginRatio: '0.3',
          }}
          size={px2hd(45)}
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
          itemWidth={px2hd(130)}
          offsetX={px2hd(10)}
          itemFormatter={(item: string) => {
            const legendItem = legendList.filter(
              legend => legend.value === item,
            );
            return legendItem[0]?.label;
          }}
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
        <Guide
          type="text"
          limitInPlot={true}
          data={newData}
          style={{
            textBaseline: 'bottom',
            textAlign: 'center',
            fontSize: px2hd(30),
          }}
          content={(item: GroupColumnDataProps) => {
            return item?.y;
          }}
          position={(item: GroupColumnDataProps) => {
            return [item?.index, item?.y];
          }}
          {...guide}
        />
      </Chart>
    </div>
  );
};

export default GroupColumn;