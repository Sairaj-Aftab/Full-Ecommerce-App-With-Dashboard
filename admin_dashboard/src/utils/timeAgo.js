export const timeAgo = (date) => {
  const timeUnits = [
    { unit: "year", inMilliseconds: 31536000000 },
    { unit: "month", inMilliseconds: 2592000000 },
    { unit: "day", inMilliseconds: 86400000 },
    { unit: "hour", inMilliseconds: 3600000 },
    { unit: "minute", inMilliseconds: 60000 },
    { unit: "second", inMilliseconds: 1000 },
  ];

  const currentDate = new Date();
  const inputDate = new Date(date);
  const timeDifference = currentDate - inputDate;

  for (let i = 0; i < timeUnits.length; i++) {
    const { unit, inMilliseconds } = timeUnits[i];
    const timeDifferenceInUnit = Math.floor(timeDifference / inMilliseconds);

    if (timeDifferenceInUnit >= 1) {
      return timeDifferenceInUnit === 1
        ? `${timeDifferenceInUnit} ${unit} ago`
        : `${timeDifferenceInUnit} ${unit}s ago`;
    }
  }

  return "Just now"; // If the date is in the future or something went wrong
};

// Example usage:
//   const pastDate = '2023-07-20T12:00:00'; // Can also pass a timestamp here
//   console.log(timeAgo(pastDate)); // Output: "5 days ago"
