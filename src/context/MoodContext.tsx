import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react'
import { EMood, EPeriod } from '../shared/const.tsx'
import { Action } from './Actions.tsx'
import { moodReducer } from './Reducer.tsx'

export interface IMoodEntry {
  date: string
  mood: number
}

export interface IMoodEntryDay {
  date: number
  mood: number
}

export interface IState {
  timePeriod: string
  moodDayData: IMoodEntryDay[]
  moodWeekData: IMoodEntry[]
  moodMonthData: IMoodEntry[]
}

const initialState: IState = {
  timePeriod: EPeriod.Week,
  moodDayData: [
    {
      date: new Date().getTime(),
      mood: EMood.Neutral
    }
  ],
  moodWeekData: [{ date: new Date().toISOString().split('T')[0], mood: EMood.Neutral }],
  moodMonthData: [{ date: new Date().toISOString().split('T')[0], mood: EMood.Neutral }]
}

const MoodContext = createContext<{ state: IState; dispatch: Dispatch<Action> } | undefined>(undefined)

export const MoodProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(moodReducer, initialState)
  return <MoodContext.Provider value={{ state, dispatch }}>{children}</MoodContext.Provider>
}

export const useMood = () => {
  const context = useContext(MoodContext)
  if (!context) throw new Error('useMood must be used within a MoodProvider')
  return context
}
