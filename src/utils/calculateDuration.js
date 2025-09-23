function formatMonthYear(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function calculateDuration(startDate, endDate) {
  if (!startDate) return "";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years === 0 && months === 0) return "Less than a month";
  if (years === 0) return `${months} month(s)`;
  if (months === 0) return `${years} year(s)`;
  return `${years} year(s) ${months} month(s)`;
}
