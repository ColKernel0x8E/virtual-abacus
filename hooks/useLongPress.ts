
import React, { useCallback, useRef } from 'react';
import { LONG_PRESS_DURATION } from '../constants';

interface LongPressOptions {
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void;
  onClick?: (event: React.MouseEvent | React.TouchEvent) => void;
  duration?: number;
}

const useLongPress = ({
  onLongPress,
  onClick,
  duration = LONG_PRESS_DURATION,
}: LongPressOptions) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressTriggeredRef = useRef(false);

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      isLongPressTriggeredRef.current = false;
      // Prevent context menu on right-click long press
      if ('button' in event && event.button === 2) {
        event.preventDefault();
      }
      timerRef.current = setTimeout(() => {
        onLongPress(event);
        isLongPressTriggeredRef.current = true;
      }, duration);
    },
    [onLongPress, duration]
  );

  const clear = useCallback(
    (event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (shouldTriggerClick && onClick && !isLongPressTriggeredRef.current) {
        onClick(event);
      }
    },
    [onClick]
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    start(event);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    clear(event);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    clear(event, false); // Don't trigger click if mouse leaves
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    start(event);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    clear(event);
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};

export default useLongPress;
