import { FC } from 'react'
import { IMoodEntry, IMoodEntryDay, useMood } from '../../context/MoodContext.tsx'
import FaceSvgButton from '../../shared/components/FaceSvgButton/FaceSvgButton.tsx'
import MoodChart from '../MoodChart/MoodChart.tsx'
import { EActions, EMood, EPeriod } from '../../shared/const.tsx'
import './style.scss'

const CLASS_NAME = 'mood-tracker'
const addNextDayMood = (moodData: IMoodEntry[]): string => {
  if (moodData.length === 0) {
    throw new Error('moodData cannot be empty')
  }

  const lastEntry = moodData[moodData.length - 1]
  const lastDate = new Date(lastEntry.date)

  const nextDate = new Date(lastDate)
  nextDate.setDate(lastDate.getDate() + 1)

  return nextDate.toISOString().split('T')[0]
}

const addNextHourMood = (moodData: IMoodEntryDay[]) => {
  const lastEntryDate = moodData.length ? Number(moodData[moodData.length - 1].date) : new Date().getTime()

  return new Date(lastEntryDate + 60 * 60 * 1000).getTime()
}

const MoodTracker: FC = () => {
  const { state, dispatch } = useMood()

  const handleSave = (selectedMood: number) => {
    if (selectedMood !== null) {
      if (state.timePeriod === EPeriod.Week) {
        const date = addNextDayMood(state.moodWeekData)
        dispatch({ type: EActions.AddWeek, payload: { date, mood: selectedMood } })
      } else if (state.timePeriod === EPeriod.Month) {
        const date = addNextDayMood(state.moodMonthData)
        dispatch({ type: EActions.AddMonth, payload: { date, mood: selectedMood } })
      } else {
        const date = addNextHourMood(state.moodDayData)
        dispatch({ type: EActions.AddDay, payload: { date, mood: selectedMood } })
      }
    }
  }

  return (
    <div className={CLASS_NAME}>
      <h2>Mood Tracker</h2>
      <div className={`${CLASS_NAME}__container`}>
        <div className={`${CLASS_NAME}__mood`}>
          <FaceSvgButton mood={EMood.Sad} onClick={() => handleSave(EMood.Sad)} />
          <FaceSvgButton mood={EMood.Neutral} onClick={() => handleSave(EMood.Neutral)} />
          <FaceSvgButton mood={EMood.Happy} onClick={() => handleSave(EMood.Happy)} />
        </div>
        <div className={`${CLASS_NAME}__chart`}>
          <MoodChart />
        </div>
      </div>
    </div>
  )
}

export default MoodTracker
