import React, { FC, useState, useRef } from 'react';
import { useTracker, withError } from '@alitajs/tracker';
import LineToolTips from './components/ToolTips';
import {
  Chart,
  Geometry,
  Tooltip,
  Axis,
  px2hd,
  Interaction,
} from '@alitajs/f2';
import {
  LineProps as LineBasicProps,
  LineToolTipsViewProps,
} from './PropsType';
import './index.less';

const prefixCls = 'alita-charts-linebasic';
const LineBaisc: FC<LineBasicProps> = ({
  data = [],
  canvasPadding = [px2hd(90), px2hd(30), 'auto', 'auto'],
  canvasSize,
  colDefs,
  axisGridColor = '#EDF0F5',
  lineColor = 'l(0) 0:#8FA0FC 1:#4768FF',
  areaColor = 'l(90) 0:#4768FF 1:#f5f5f5',
  lineShadowColor = 'rgba(118, 140, 253, 0.1)',
  axisLineColor = '#EDF0F5',
  axisLabelColor = '#BABABA',
  axisXLabel,
  axisYLabel,
  style = {},
  aliasPosition = {
    x: 'date',
    y: 'value',
  },
  onRenderToolTips,
}) => {
  if (!data) {
    return <p>data is undefined!</p>;
  }

  let toolTipsRef: HTMLDivElement;
  const lineBaiscRef = useRef(null);
  const chartsRef = useRef(null);
  const [toolTips, setToolTips] = useState<{
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    hide: boolean;
    x?: number;
    y?: number;
    toolTips?: React.ReactNode;
  }>({ title: '', subTitle: '', hide: true, x: 0, y: 0 });

  const log = useTracker(LineBaisc.displayName, {});
  return (
    <div className={prefixCls} ref={lineBaiscRef} style={canvasSize ?? {}}>
      <Chart
        pixelRatio={window.devicePixelRatio}
        data={data}
        padding={canvasPadding}
        colDefs={colDefs}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
        ref={chartsRef}
      >
        <LineToolTips
          {...toolTips}
          toolTipsRef={ref => {
            toolTipsRef = ref;
          }}
        />
        <Axis
          field="month"
          label={(text: string) => {
            const ctf = {
              fontSize: px2hd(30),
              fill: axisLabelColor,
              text: axisXLabel ? axisXLabel(text) : text,
            };
            return ctf;
          }}
          line={{
            lineWidth: px2hd(2),
            stroke: axisLineColor,
            top: true, // 展示在最上层
            lineDash: [px2hd(10), px2hd(10)],
          }}
          labelOffset={px2hd(30)}
        />
        <Axis
          field="count"
          line={{
            lineWidth: px2hd(2),
            stroke: axisLineColor,
            top: true, // 展示在最上层
            lineDash: [px2hd(10), px2hd(10)],
          }}
          label={(text: string) => {
            const ctf = {
              fontSize: px2hd(30),
              fill: axisLabelColor,
              text: axisYLabel ? axisYLabel(text) : `${text}`,
            };
            return ctf;
          }}
          grid={{
            lineWidth: px2hd(2),
            stroke: axisGridColor,
            lineDash: [px2hd(10), px2hd(10)],
          }}
          labelOffset={px2hd(10)}
        />
        <Geometry
          type="area"
          position={`${aliasPosition.x}*${aliasPosition.y}`}
          shape={'smooth'}
          color={areaColor}
          adjust="stack"
        />
        <Geometry
          type="line"
          position={`${aliasPosition.x}*${aliasPosition.y}`}
          adjust="stack"
          size={px2hd(5)}
          shape={'smooth'}
          color={lineColor}
          style={{
            shadowColor: lineShadowColor,
            shadowBlur: px2hd(12),
            shadowOffsetY: px2hd(36),
          }}
          pixelRatio={window.devicePixelRatio}
        />
        <Tooltip
          pixelRatio={window.devicePixelRatio}
          custom
          showCrosshairs
          crosshairsStyle={{
            stroke: lineColor,
            lineWidth: px2hd(2),
          }}
          showTooltipMarker
          tooltipMarkerStyle={{
            fill: '#fff', // 设置 tooltipMarker 的样式
            lineWidth: px2hd(3),
            radius: px2hd(10),
          }}
          onShow={(ev: any) => {
            let currentData = ev.items[0];
            let toolView: LineToolTipsViewProps =
              (onRenderToolTips
                ? onRenderToolTips(currentData)
                : {
                    title: `${currentData.title}`,
                    subTitle: `${currentData.value}`,
                  }) ?? {};
            setToolTips({
              x: currentData.x + px2hd(10),
              y: currentData.y - toolTipsRef.getBoundingClientRect().height / 2,
              hide: false,
              title: toolView.title ?? `${currentData.title}`,
              subTitle: toolView.subTitle ?? `${currentData.value}`,
            });
            log('Tooltip: onShow');
          }}
          onHide={() => {
            log('Tooltip: onHiden');
            setToolTips({
              hide: true,
            });
          }}
        />
        <Interaction
          field="pan"
          mode="x"
          speed={20}
          step={5}
          onStart={() => {
            log('Interaction-pan: onStart');
            setToolTips({
              hide: true,
            });
          }}
        />
      </Chart>
    </div>
  );
};

LineBaisc.displayName = 'LineBaisc';
export default withError(LineBaisc);
