import './style.scss'
import { FC } from 'react'
import { MoodProvider } from './context/MoodContext.tsx'
import MoodAnalysis from './components/MoodAnalysis/MoodAnalysis.tsx'
import DailyInsights from './components/DailyInsights/DailyInsights.tsx'
import MoodTracker from './components/MoodTracker/MoodTracker.tsx'

const CLASS_NAME = 'dashboard'
const App: FC = () => {
  return (
    <MoodProvider>
      <div className={CLASS_NAME}>
        <h1>Insightly Dashboard</h1>
        <DailyInsights />
        <MoodTracker />
        <MoodAnalysis />
      </div>
    </MoodProvider>
  )
}

export default App
