import { daysInAMonth, daysInAWeek, EPeriod, hoursInADay } from '../shared/const.tsx'
import { IMoodEntry, IMoodEntryDay, IState } from './MoodContext.tsx'

export const getMoodData = (state: IState): IMoodEntry[] | IMoodEntryDay[] => {
  return state.timePeriod === EPeriod.Week
    ? state.moodWeekData?.slice(-daysInAWeek)
    : state.timePeriod === EPeriod.Month
      ? state.moodMonthData?.slice(-daysInAMonth)
      : state.moodDayData?.slice(-hoursInADay)
}

export const getTimeFormat = (time: number) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}
