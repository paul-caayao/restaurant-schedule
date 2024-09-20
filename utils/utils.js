const daysMap = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const parseOpeningHours = (openingHoursString) => {
  if (typeof openingHoursString !== "string") {
    throw new Error("Invalid opening_hours format. Expected a string.");
  }

  return openingHoursString
    .split(";")
    .map((range) => {
      const [daysPart, timePart] = range.trim().split(/ (.+)/);
      const [openTime, closeTime] = timePart.split(" - ");

      if (!daysPart || !timePart || !openTime || !closeTime) {
        throw new Error(
          "Invalid time range format. Both days and time parts are required."
        );
      }

      const expandedDays = expandDays(daysPart.trim());
      const openTimeFormatted = convertTo24Hour(openTime.trim());
      const closeTimeFormatted = convertTo24Hour(closeTime.trim());

      const parsedTimes = [];

      if (closeTimeFormatted < openTimeFormatted) {
        for (let i = 0; i < expandedDays.length; i++) {
          const day = expandedDays[i];
          const nextDay = expandedDays[i + 1] || getNextDay(day);

          parsedTimes.push({
            day: daysMap[day],
            open: openTimeFormatted,
            close: "23:59",
          });

          parsedTimes.push({
            day: daysMap[nextDay],
            open: "00:00",
            close: closeTimeFormatted,
          });

          break;
        }
      } else {
        expandedDays.forEach((day) => {
          parsedTimes.push({
            day: daysMap[day],
            open: openTimeFormatted,
            close: closeTimeFormatted,
          });
        });
      }

      return parsedTimes;
    })
    .flat();
};

const expandDays = (daysPart) => {
  if (daysPart.includes("-")) {
    const [startDay, endDay] = daysPart.split("-");
    const startIndex = daysOrder.indexOf(startDay.trim());
    const endIndex = daysOrder.indexOf(endDay.trim());

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Invalid day abbreviation in range.");
    }

    return daysOrder.slice(startIndex, endIndex + 1);
  } else if (daysOrder.includes(daysPart.trim())) {
    return [daysPart.trim()];
  } else {
    throw new Error("Invalid day abbreviation.");
  }
};

const convertTo24Hour = (time) => {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "pm" && hours < 12) {
    hours += 12;
  }

  if (modifier === "am" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes || "00"}`;
};

const getNextDay = (day) => {
  const dayIndex = daysOrder.indexOf(day);
  return daysOrder[(dayIndex + 1) % daysOrder.length];
};

const parseDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const time = date.toTimeString().substring(0, 5);
  return { dayOfWeek, time };
};

export { parseOpeningHours, parseDateTime };
