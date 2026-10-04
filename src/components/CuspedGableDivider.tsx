import React from "react";

interface Props {
  className?: string;
  fillColor?: string;
  invert?: boolean;
}

export function CuspedGableDivider({
  className = "",
  fillColor = "currentColor",
  invert = false,
}: Props) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${invert ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12"
        style={{ fill: fillColor }}
      >
        {/* Fusion of Amsterdam Stepped Gable with Jaipur Scalloped Arch */}
        <path d="M0,48 L0,24 L100,24 L100,16 L200,16 L200,8 L350,8 L350,4 L450,4 C 520,4 560,0 600,0 C 640,0 680,4 750,4 L850,4 L850,8 L1000,8 L1000,16 L1100,16 L1100,24 L1200,24 L1200,48 Z" />
      </svg>
    </div>
  );
}
