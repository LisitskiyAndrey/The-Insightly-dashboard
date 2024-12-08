import { Action } from './Actions.tsx';
import { EActions } from '../shared/const.tsx';
import { IState } from './MoodContext.tsx';

export const moodReducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case EActions.AddTimePeriod:
      return { ...state, timePeriod: action.payload }
    case EActions.AddDay:
      return { ...state, moodDayData: [...state.moodDayData, action.payload] }
    case EActions.AddWeek:
      return { ...state, moodWeekData: [...state.moodWeekData, action.payload] }
    case EActions.AddMonth:
      return { ...state, moodMonthData: [...state.moodMonthData, action.payload] }
    default:
      return state
  }
}
