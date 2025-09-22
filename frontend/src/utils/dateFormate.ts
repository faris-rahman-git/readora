import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export function formatCreatedAt(dateString: Date) {
  const date = dayjs(dateString);

  if (date.isToday()) {
    return date.fromNow()
  }

  return date.format("MMM D, YYYY");
}
