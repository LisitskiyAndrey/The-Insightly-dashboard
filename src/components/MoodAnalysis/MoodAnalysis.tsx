import { FC } from 'react'
import { useMood } from '../../context/MoodContext.tsx'
import { getMoodData } from '../../context/helper.tsx'
import './style.scss'

const CLASS_NAME = 'mood-analysis'
const MoodAnalysis: FC = () => {
  const { state } = useMood()
  const moodData = getMoodData(state)

  const trend = moodData?.reduce((acc, entry, index, arr) => {
    if (index > 0) {
      const diff = entry.mood - arr[index - 1].mood
      acc += diff > 0 ? 1 : diff < 0 ? -1 : 0
    }
    return acc
  }, 0)

  const message =
    trend > 0
      ? 'Your mood has been improving over the past few days!'
      : trend < 0
        ? 'It seems like you’ve been feeling a bit down. Hang in there!'
        : 'Your mood has been varying lately. Try finding balance!'

  return <div className={CLASS_NAME}>{message}</div>
}

export default MoodAnalysis
