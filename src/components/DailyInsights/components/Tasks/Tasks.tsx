import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { FC, useState } from 'react'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import cn from 'classnames'

interface ITask {
  className: string
}

const tasksCompleted = () => Math.floor(Math.random() * 10) + 1

const data = [
  { name: 'Completed', value: tasksCompleted(), color: '#2fff00ff' },
  { name: 'New', value: tasksCompleted(), color: '#B0B0B0FF' },
  { name: 'Active', value: tasksCompleted(), color: '#0b36e1' },
  { name: 'In Test', value: tasksCompleted(), color: '#f8ac55' }
]

const renderActiveShape = (props: PieSectorDataItem) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props

  return (
    <g>
      <text fontSize={24} x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} color={'#fff'}>
        {payload.name} {payload.value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
    </g>
  )
}

const Tasks: FC<ITask> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div className={cn(`${className}`)}>
        <PieChart width={300} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            paddingAngle={5}
            innerRadius={80}
            outerRadius={120}
            fill={'#8884d8'}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          />
        </PieChart>
      </div>
    </ResponsiveContainer>
  )
}

export default Tasks
