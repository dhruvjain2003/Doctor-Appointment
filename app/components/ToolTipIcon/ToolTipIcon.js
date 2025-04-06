"use client";
import { useState } from "react";
import styles from "./ToolTipIcon.module.css";

export default function TooltipIcon({ icon: Icon, tooltipText }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Icon className={styles.icon} />
      {showTooltip && <div className={styles.tooltip}>{tooltipText}</div>}
    </div>
  );
}
