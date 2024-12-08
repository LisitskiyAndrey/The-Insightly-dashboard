import { EActions } from '../shared/const.tsx'
import { IMoodEntry, IMoodEntryDay } from './MoodContext.tsx'

type AddTimePeriodAction = { type: EActions.AddTimePeriod; payload: string }
type AddDayAction = { type: EActions.AddDay; payload: IMoodEntryDay }
type AddWeekAction = { type: EActions.AddWeek; payload: IMoodEntry }
type AddMonthAction = { type: EActions.AddMonth; payload: IMoodEntry }

export type Action = AddDayAction | AddWeekAction | AddMonthAction | AddTimePeriodAction
