import {
  addHours,
  addMinutes,
  addSeconds,
  formatDistance,
  getDay,
  isAfter,
  isBefore,
  startOfDay,
} from 'date-fns'

export type MESSAGE_ID = 'day' | 'hour-early' | 'hour-late'

export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7

export const defaultOptions = {
  workdays: [1, 2, 3, 4, 5],
  start: '08:00:00',
  end: '18:00:00',
}

export type NoOvertimeOptions = {
  end: string
  start: string
  workdays: Weekday[]
}

export const noOvertimeImpl = (
  currentTime: Date,
  ooptions?: NoOvertimeOptions,
) => {
  const options = ooptions ?? defaultOptions

  if (options.workdays.includes(getDay(currentTime))) {
    // Extract hours, minutes, and seconds from start and end times
    const [startHour, startMinute, startSecond] = options.start
      .split(':')
      .map(Number)
    const [endHour, endMinute, endSecond] = options.end.split(':').map(Number)

    // Create date intervals for the start and end times
    const startTime = addSeconds(
      addMinutes(addHours(startOfDay(currentTime), startHour), startMinute),
      startSecond,
    )
    const endTime = addSeconds(
      addMinutes(addHours(startOfDay(currentTime), endHour), endMinute),
      endSecond,
    )

    if (isBefore(currentTime, startTime))
      return {
        messageId: 'hour-early' as const,
        data: { duration: formatDistance(currentTime, startTime) },
      }
    else if (isAfter(currentTime, endTime))
      return {
        messageId: 'hour-late' as const,
        data: { duration: formatDistance(currentTime, endTime) },
      }
  } else
    return {
      messageId: 'day' as const,
    }
}
