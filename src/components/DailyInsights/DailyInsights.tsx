import { FC } from 'react'
import Tasks from './components/Tasks/Tasks.tsx'
import Score from './components/Score/Score.tsx'
import './style.scss'

const CLASS_NAME = 'daily-insights'
const DailyInsights: FC = () => (
  <div className={CLASS_NAME}>
    <h2>Daily Insights</h2>
    <div className={`${CLASS_NAME}__info`}>
      <Tasks className={`${CLASS_NAME}__task`} />
      <Score className={`${CLASS_NAME}__score`} />
    </div>
  </div>
)

export default DailyInsights
