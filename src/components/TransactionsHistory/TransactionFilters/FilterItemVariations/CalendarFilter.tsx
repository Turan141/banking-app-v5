import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { getDateFromCalendar } from "@/helpers/DateTimeFormats";
import { Arrow } from "@/assets/icons/Arrow";
import { REQ_ACTIVE_DATE_VALUES } from "@/managers/TransactionManager";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const styles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

  //@ts-ignore
const selectedRangeStyle: React.CSSProperties = {
  marginBottom: "10px",
  fontSize: "20px",
  fontWeight: "var(--fontSemiBold600)",
  color: "contentPrimary.main",
};

const selectedDateStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "var(--fontSemiBold600)",
  color: "contentPrimary.main",
};

const selectMonthStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // marginBottom: "10px",
};

const daysOfWeekStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  marginBottom: "10px",
  fontSize: "14px",
};

const dayStyle: React.CSSProperties = {
  boxSizing: "border-box", // Ensure padding and border are included in the element's total width and height
  padding: 0, // Set padding to 0
  margin: 0, // Set margin to 0
  cursor: "pointer",
  textAlign: "center",
  width: "100%",
  // height: "49px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const selectedDayStyle: React.CSSProperties = {
  backgroundColor: "#D92626",
};

const rangeDayStyle: React.CSSProperties = {
  backgroundColor: "#F7D4D4",
};

const Calendar = ({
  onDateSelect,
}: {
  onDateSelect: any;
}) => {
  const [selectedRange, setSelectedRange] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [activeDateValues] = REQ_ACTIVE_DATE_VALUES.useRequest();

  useEffect(() => {
    if (selectedRange.length > 0) processDateSelect();
  }, [selectedRange]);

  useEffect(() => {
    if (!activeDateValues || activeDateValues.length < 1) return;
  
    const dates = activeDateValues.map((dateStr) => new Date(dateStr).getDate()).filter(Boolean);
  
    if (dates.length === 1) {
      setSelectedRange([dates[0]]);
    } else if (dates.length === 2) {
      setSelectedRange(dates);
    } else {
      setSelectedRange([]);
    }
  
    setSelectedMonth(new Date(activeDateValues[0]));
  }, [activeDateValues]);

  const processDateSelect = () => {
    const { date_from, date_to } = getDateFromCalendar( selectedRange, selectedMonth );
    onDateSelect(date_from + "/" + date_to);
  };

  const resetDayValues = () => {
    onDateSelect(null);
    setSelectedRange([]);
  };

  const getDaysInMonth = (year: number, month: number): number[] => {
    const lastDay = new Date(year, month + 1, 0);
    return Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
  };

  const getStartingDayOfWeek = (year: number, month: number): number => {
    const firstDay = new Date(year, month, 1);
    return firstDay.getDay();
  };

  const handleDayClick = (day: number): void => {
    if (selectedRange.length === 2) {
      setSelectedRange([day]);
    } else if (selectedRange.length === 1) {
      setSelectedRange((prevRange) => {
          //@ts-ignore
        const [start, end] = prevRange;
        return day < start ? [day, start] : [start, day];
      });
    } else {
      setSelectedRange([day]);
    }
  };

  const handleMonthChange = (
      //@ts-ignore
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const newMonth = new Date(selectedMonth);
    if (event.currentTarget.value === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setSelectedMonth(newMonth);
    resetDayValues();
  };

  const renderDays = (): React.ReactNode => {
    const currentDate = new Date();
    const daysInMonth = getDaysInMonth(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth()
    );
    const startingDayOfWeek = getStartingDayOfWeek(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth()
    );

    return Array.from({ length: startingDayOfWeek }, (_, i) => (
      <div key={`placeholder-${i}`} style={dayStyle}></div>
    )).concat(
      daysInMonth.map((day) => {
        const currentDateObj = new Date(
          selectedMonth.getFullYear(),
          selectedMonth.getMonth(),
          day
        );
        const isTodayOrLater = currentDateObj >= currentDate;

        return (
          <Box
            sx={{ display: "flex", alignItems: "center", height: "49px" }}
            key={day}
          >
            <Typography
              sx={{
                ...dayStyle,
                ...(selectedRange.includes(day) ? selectedDayStyle : {}),
                ...(selectedRange.length === 2 &&
                day > selectedRange[0] &&
                day < selectedRange[1]
                  ? rangeDayStyle
                  : {}),
                color: selectedRange.includes(day)
                  ? "#FFFFFF"
                  : isTodayOrLater
                  ? "text.disabled"
                  : "contentPrimary.main",
                pointerEvents: isTodayOrLater ? "none" : "initial",
                height: "40px",
              }}
              onClick={() => !isTodayOrLater && handleDayClick(day)}
            >
              {day}
            </Typography>
          </Box>
        );
      })
    );
  };

  const renderDaysOfWeek = (): React.ReactNode => {
    return daysOfWeek.map((day) => (
      <Box key={day} sx={{ ...dayStyle, color: "contentQuaternary.main" }}>
        {day}
      </Box>
    ));
  };

  //@ts-ignore
  const formatSelectedRange = (): string => {
    if (selectedRange.length === 2) {
      const [start, end] = selectedRange;
      const startDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        start
      );
      const endDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        end
      );

      return `${startDate.toLocaleDateString("default", {
        month: "short",
      })} ${start} - ${endDate.toLocaleDateString("default", {
        month: "short",
      })} ${end}`;
    }
    return "Select a range";
  };

  return (
    <Box style={styles}>
      {/* <Box style={selectedRangeStyle}>{formatSelectedRange()}</Box> */}

      <Box style={selectMonthStyle}>
        <Button
          //@ts-ignore
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleMonthChange(e)
          }
          value="prev"
        >
          <IconButton sx={{ transform: "rotate(0)" }}>
            <Arrow />
          </IconButton>
        </Button>

        <span style={selectedDateStyle}>{`${selectedMonth.toLocaleString(
          "default",
          { month: "long" }
        )} ${selectedMonth.getFullYear()}`}</span>

        <Button
          //@ts-ignore
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleMonthChange(e)
          }
          value="next"
        >
          <IconButton sx={{ transform: "rotate(180deg)" }}>
            <Arrow />
          </IconButton>
        </Button>
      </Box>

      <Box style={daysOfWeekStyle}>{renderDaysOfWeek()}</Box>

      <Box style={daysOfWeekStyle}>{renderDays()}</Box>
    </Box>
  );
};

export default Calendar;
