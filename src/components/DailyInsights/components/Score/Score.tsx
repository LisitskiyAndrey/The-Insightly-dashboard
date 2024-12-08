import { ResponsiveContainer } from 'recharts'
import { IMoodEntry, IMoodEntryDay, useMood } from '../../../../context/MoodContext.tsx'
import { FC } from 'react'
import FaceIcon from '../../../../shared/components/FaceIcon/FaceIcon.tsx'
import { daysInAMonth, daysInAWeek, EPeriod, hoursInADay } from '../../../../shared/const.tsx'
import { getMoodData } from '../../../../context/helper.tsx'
import './style.scss'

interface IScore {
  className: string
}

const CLASS_NAME = 'score'

const averageMoodScore = (moodData: IMoodEntry[] | IMoodEntryDay[], maxPeriod: number) => {
  const timePeriod = maxPeriod >= moodData.length ? moodData.length : maxPeriod
  return moodData.reduce((acc, entry) => acc + entry.mood, 0) / timePeriod
}

const Score: FC<IScore> = ({ className }) => {
  const { state } = useMood()
  const moodData = getMoodData(state)
  const moodScore =
    (state.timePeriod === EPeriod.Week
      ? averageMoodScore(moodData, daysInAWeek)
      : state.timePeriod === EPeriod.Month
        ? averageMoodScore(moodData, daysInAMonth)
        : averageMoodScore(moodData, hoursInADay)) || 0
  return (
    <ResponsiveContainer className={`${className}`} width="100%" height="100%">
      <div className={`${CLASS_NAME}`}>
        <FaceIcon moodScore={moodScore} />
        <p>
          Mood score for the last
          {state.timePeriod === EPeriod.Week
            ? ` ${daysInAWeek} day(s)`
            : state.timePeriod === EPeriod.Month
              ? ` ${daysInAMonth} day(s)`
              : ` ${hoursInADay} hour(s)`}
          : <b>{moodScore.toFixed(2)}</b>
        </p>
      </div>
    </ResponsiveContainer>
  )
}
export default Score
