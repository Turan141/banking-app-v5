export const formatDate = (timestamp: string, format: string): string => {
  const date = new Date(Number(timestamp) * 1000); // Convert seconds to milliseconds

  // const options: Intl.DateTimeFormatOptions = {
  //     year: format.includes('YYYY') ? 'numeric' : undefined,
  //     month: format.includes('MMMM') ? 'long' : 'numeric',
  //     day: format.includes('dd') ? '2-digit' : 'numeric',
  //     hour: format.includes('HH') ? 'numeric' : undefined,
  //     minute: format.includes('mm') ? 'numeric' : undefined,
  // };

  // const formattedDate = date.toLocaleDateString('en-US', options);

  const replaceMap: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MMMM: new Date(date).toLocaleString("en-US", { month: "long" }),
    MM: ("0" + (date.getMonth() + 1)).slice(-2),
    dd: ("0" + date.getDate()).slice(-2),
    HH: ("0" + date.getHours()).slice(-2),
    mm: ("0" + date.getMinutes()).slice(-2),
  };

  return format.replace(
    /YYYY|YY|MMMM|MM|dd|HH|mm/g,
    (match) => replaceMap[match]
  );
};

// Example usage:
//   const formattedDate1 = formatDate("1702996602", "MM/dd/YYYY"); // Example format: MM/dd/YYYY
//   console.log(formattedDate1); // Output: "Nov/14/2023"

//   const formattedDate2 = formatDate("1702996602", "dd/MM/YYYY"); // Example format: dd/MM/YYYY
//   console.log(formattedDate2); // Output: "14/11/2023"

export const getDateFromCalendar = (selectedRange: number[], selectedMonth: Date) => {
  const startDay = selectedRange[0];
  const endDay = selectedRange[1];

  const date_from = startDay
    ? `${selectedMonth.getFullYear()}.${String(
        selectedMonth.getMonth() + 1
      ).padStart(2, "0")}.${String(startDay).padStart(2, "0")}`
    : "";

  const date_to = endDay
    ? `${selectedMonth.getFullYear()}.${String(
        selectedMonth.getMonth() + 1
      ).padStart(2, "0")}.${String(endDay).padStart(2, "0")}`
    : "";

  return {
    date_from,
    date_to,
  };
};
