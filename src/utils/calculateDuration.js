// Format tanggal ke "Mon YYYY" atau "Present" jika kosong
export function formatDate(dateString) {
  if (!dateString) return "Present";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

// Hitung durasi dari startDate sampai endDate atau sekarang jika endDate null
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

// Fungsi helper untuk otomatis endDate menjadi now jika null
export function getEndDate(endDate) {
  return endDate ? new Date(endDate) : new Date();
}
