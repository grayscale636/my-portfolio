export function formatDate(date: string, includeRelative = false) {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  
  // Always return static format for SSR consistency
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric", 
    year: "numeric",
    timeZone: "UTC"
  };
  
  // Use static formatter that's consistent across server/client
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const fullDate = formatter.format(targetDate);

  // Never include relative dates to avoid hydration mismatch
  return fullDate;
}
