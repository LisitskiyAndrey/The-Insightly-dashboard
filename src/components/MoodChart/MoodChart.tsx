import { FC, useState } from 'react'
import { useMood } from '../../context/MoodContext.tsx'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import NeonButton from '../../shared/components/Button/NeonButton.tsx'
import { EActions, EPeriod } from '../../shared/const.tsx'
import { getMoodData, getTimeFormat } from '../../context/helper.tsx'
import './style.scss'

const CLASS_NAME = 'mood-chart'

const CustomizedXAxisTick = (props: any) => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={20} y={10} dy={16} textAnchor="end" fill="#ffffff" transform="rotate(-25)">
        {payload.value}
      </text>
    </g>
  )
}

const MoodChart: FC = () => {
  const { state, dispatch } = useMood()
  const [actions, setActions] = useState([
    { name: EPeriod.Day, isActive: false },
    { name: EPeriod.Week, isActive: true },
    { name: EPeriod.Month, isActive: false }
  ])

  const handleButtonClick = (name: string) => {
    dispatch({ type: EActions.AddTimePeriod, payload: name })
    setActions(prevActions => prevActions.map(action => ({ ...action, isActive: action.name === name })))
  }

  const moodData = getMoodData(state)
  const data = moodData.map(mood => {
    return {
      name: state.timePeriod === EPeriod.Day ? getTimeFormat(mood.date as number) : mood.date,
      uv: mood.mood
    }
  })

  return (
    <div className={`${CLASS_NAME}`}>
      <section className={`${CLASS_NAME}__actions`}>
        {actions.map(action => (
          <NeonButton
            key={action.name}
            onClick={() => handleButtonClick(action.name)}
            isActive={action.isActive}
            title={action.name}
          />
        ))}
      </section>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={'preserveStartEnd'} height={60} tick={<CustomizedXAxisTick />} />
          <YAxis />
          <Area type="monotone" dataKey="uv" stroke={'#8884d8'} fill={'#8884d8'} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MoodChart
