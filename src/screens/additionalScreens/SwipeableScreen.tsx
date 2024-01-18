import { Box } from "@mui/material";
import { useState } from "react";

export const SwipeableScreen = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [closing, setClosing] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [draggedStyle, setDraggedStyle] = useState({});
  //@ts-ignore
  const handleTouchStart = (e) => {
    setStartPosition(e.touches[0].clientY);
  };
  //@ts-ignore
  const handleTouchMove = (e) => {
    e.preventDefault();

    const currentPosition = e.touches[0].clientY;
    const distance = currentPosition - startPosition;

    if (distance > 0 && distance < 200) {
      const transform = `translateY(${distance}px)`;
      setDraggedStyle({
        WebkitTransform: transform,
        transform: transform,
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      });
    }
  };
  //@ts-ignore
  const handleTouchEnd = (e) => {
    const endPosition = e.changedTouches[0].clientY;
    const distance = endPosition - startPosition;

    if (distance > 200) {
      setClosing(true);
      const transform = `translateY(-100px)`;
      setDraggedStyle({
        WebkitTransform: transform,
        transform: transform,
        WebkitTransition: "transform 2s ease",
        transition: "transform 2s ease",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      });

      setTimeout(() => {
        setDraggedStyle({});
        // setClosing(false);
      }, 300);
    } else {
      setDraggedStyle({});
    }
  };

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "absolute",
        top: "150px",
        left: 0,
        width: "100%",
        height: "100px",
        backgroundColor: "lightblue",
        display: closing ? "none" : "block",
        zIndex: 999,
        ...draggedStyle,
      }}
    >
      <Box>Swipe down to collapse</Box>
      {children}
    </Box>
  );
};
