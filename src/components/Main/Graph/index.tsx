import classNames from "classnames";
import { useState, useRef } from "react";
import { useClickOutside } from "src/hooks/useClickOutside";
import Selector from "src/components/Widgets/Selector";
import icons from "src/constants/icons";
import styles from "./styles.module.scss";

interface GraphWidgetProps {
  large?: boolean;
}

const GraphWidget = ({ large }: GraphWidgetProps) => {

  const selectorData = [`24h`, `3d`, `7d`, `30d`];

  const [showTimeSelector, setShowTimeSelector] = useState<boolean>(false);
  const [timespan, setTimespan] = useState<string>(`7d`);

  const timeSelectorRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    timeSelectorRef,
    () => showTimeSelector && setShowTimeSelector(false)
  );

  const handleOnSelect = (timespan: string) => {
    setTimespan(timespan);
    setShowTimeSelector(false);
  };

  return (
    <div className={styles.graphWidget}>
      <div className={classNames(large && styles.large, styles.graph)}>
        {large ? (
          <svg
            width="209"
            height="80"
            viewBox="0 0 209 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m46.173 12.275-30.34 5.21L1 14.357V80h208V2.203h-8.091L168.546 19.22l-28.992 1.736-31.014 8.336-30.34-6.6-32.027-10.418Z"
              fill="url(#a)"
            />
            <path
              d="m1 14.358 14.833 3.126 30.34-5.21L78.2 22.695l30.341 6.599 31.014-8.336 28.992-1.736 32.363-17.018H209"
              stroke="#2260FF"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="a"
                x1="105"
                y1="2.203"
                x2="105"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2260FF" stopOpacity=".2" />
                <stop offset="1" stopColor="#2260FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width="104"
            height="52"
            viewBox="0 0 104 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.9763 10.8503L7.87867 14.9998L0.49762 11.9998L0.497627 51.9998H104V0.791504H99.974L83.8699 16.4998L69.4433 18.4998L54.0102 26.9998L38.9126 19.9998L22.9763 10.8503Z"
              fill="url(#paint0_linear_14_4361)"
            />
            <path
              d="M1.00003 12.5129L8.34525 15.4409L23.3696 10.561L39.2285 20.3208L54.2529 26.502L69.611 18.6942L83.9676 17.0675L99.9935 1.12646H104"
              stroke="#E1FF28"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_14_4361"
                x1="52.2488"
                y1="0.791504"
                x2="52.2488"
                y2="51.9998"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E1FF28" stopOpacity="0.2" />
                <stop offset="1" stopColor="#E1FF28" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
      <div className={classNames(styles.timeSelector, !large && styles.timeSelectorSmall)} ref={timeSelectorRef}>
        <span
          className={styles.timespan}
          onClick={() =>
            setShowTimeSelector((showTimeSelector) => !showTimeSelector)
          }
        >
          {timespan} <img src={icons.dropdown} alt="dropdown Icon" />
        </span>
        {showTimeSelector && (
          <div className={styles.timeSelectorContainer}>
            <Selector selectorData={selectorData} selectedValue={timespan} onSelect={handleOnSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphWidget;
