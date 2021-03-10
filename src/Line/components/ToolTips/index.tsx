import React, { FC } from 'react';
import { withError } from '@alitajs/tracker';
import './index.less';

interface ToolTipsProps {
  /**
   * @description 隐藏
   */
  hide?: boolean;
  /**
   * @description 标题
   */
  title?: string | React.ReactNode;
  /**
   * @description 子标题
   */
  subTitle?: string | React.ReactNode;
  /**
   * @description 组件x轴位置
   */
  x?: number;
  /**
   * @description 组件y轴位置
   */
  y?: number;
  /**
   * @description 组件回调返回div dom元素
   */
  toolTipsRef: (dom: HTMLDivElement) => void;
}
const prefixCls = 'alita-line-tooltips';
const ToolTips: FC<ToolTipsProps> = ({
  hide = false,
  title = '',
  subTitle = '',
  x = 0,
  y = 0,
  toolTipsRef = () => {},
}) => {
  return (
    <div
      ref={ref => {
        ref && toolTipsRef(ref);
      }}
      className={prefixCls}
      style={{ left: x, top: y, opacity: hide ? 0 : 1 }}
    >
      <div className={`${prefixCls}-title`}>{title}</div>
      <div className={`${prefixCls}-subtitle`}>{subTitle}</div>
    </div>
  );
};

ToolTips.displayName = 'ToolTips';
export default withError(ToolTips);
