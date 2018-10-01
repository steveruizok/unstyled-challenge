import React from "react";
import styled, { css } from "react-emotion";

export default ({ value, deltaValue }) => {
  let delta = Math.abs(deltaValue - value);
  let deltaBg = delta > 0 ? "var(--tone-lighter)" : "var(--tone-light)";
  let priorBg = "var(--tone-light)";

  if (deltaValue === 100) {
    deltaBg = "var(--tone-light)";
  }

  return (
    <ProgressRail>
      <PriorValueContainer
        className={css`
          width: ${value}%;
          background: ${priorBg};
        `}
      />
      <DeltaFill
        className={css`
          width: 100%;
          height: 100%;
          clip-path: inset(
            0 ${deltaValue > value ? 100 - deltaValue : 100 - value}% 0
              ${deltaValue > value ? value : deltaValue}%
          );
          background: ${deltaBg};
        `}
      />
      <div
        className={css`
          position: absolute;
          top: 0;
          left: ${value}%;
          width: 2px;
          height: 100%;
          background: var(${deltaValue > value ? "--tone-dark" : "--tone"});
        `}
      />

      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-around;
          position: absolute;
          top: 0;
          left: ${deltaValue}%;
          width: 2px;
          height: 100%;
          background: var(--tone-dark);
        `}
      >
        {deltaValue !== value && (
          <div
            className={css`
              margin-left: ${deltaValue > value ? "-1em" : "1em"};
            `}
          >
            {deltaValue > value ? "▶" : "◀"}
          </div>
        )}
      </div>
    </ProgressRail>
  );
};

const PriorValueContainer = styled("div")`
  height: 100%;
  min-height: 1em;
`;

const ProgressRail = styled("div")`
  position: relative;
  border: 1px solid;
  min-height: 1em;
  height: 100%;
  border-radius: 3px;
  overflow: hidden;
`;

const DeltaFill = styled("div")`
  position: absolute;
  top: 0;
  height: 100%;
  min-height: 1em;
  border-right: var(--border);
  border-left: var(--border);
`;
