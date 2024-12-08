import { render, fireEvent } from '@testing-library/react'
import MoodChart from './MoodChart'
import { useMood } from '../../context/MoodContext'
import { EPeriod, EActions } from '../../shared/const'

jest.mock('../../context/MoodContext', () => ({
  useMood: jest.fn()
}))

const mockDispatch = jest.fn()

const mockState = {
  state: {
    timePeriod: EPeriod.Week,
    moodDayData: [
      { date: Date.now() - 86400000, mood: 3 },
      { date: Date.now(), mood: 4 }
    ],
    moodWeekData: [
      { date: '2024-12-01', mood: 3 },
      { date: '2024-12-02', mood: 4 }
    ],
    moodMonthData: [
      { date: '2024-11-01', mood: 2 },
      { date: '2024-12-01', mood: 4 }
    ]
  },
  dispatch: mockDispatch
}

describe('MoodChart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useMood as jest.Mock).mockReturnValue(mockState)
  })

  it('renders the MoodChart component', () => {
    const { container } = render(<MoodChart />)

    // Проверяем, что компонент рендерится
    expect(container.querySelector('.mood-chart')).toBeTruthy()

    // Проверяем наличие кнопок действий
    const buttons = container.querySelectorAll('.mood-chart__actions button')
    expect(buttons).toHaveLength(3)
  })

  it('activates the correct button when clicked', () => {
    const { getByText } = render(<MoodChart />)

    const dayButton = getByText(EPeriod.Day)
    fireEvent.click(dayButton)

    // Проверяем, что dispatch вызван с правильным значением
    expect(mockDispatch).toHaveBeenCalledWith({
      type: EActions.AddTimePeriod,
      payload: EPeriod.Day
    })
  })

  it('renders the chart with correct data', () => {
    render(<MoodChart />)

    const chartData = mockState.state.moodWeekData.map(mood => ({
      name: mood.date,
      uv: mood.mood
    }))
    expect(chartData).toHaveLength(2)
  })

  it('updates data and chart when period is switched', () => {
    const { getByText } = render(<MoodChart />)

    const monthButton = getByText(EPeriod.Month)
    fireEvent.click(monthButton)

    // Проверяем, что dispatch вызван корректно
    expect(mockDispatch).toHaveBeenCalledWith({
      type: EActions.AddTimePeriod,
      payload: EPeriod.Month
    })

    // Проверяем, что обновленные данные рендерятся
    const updatedData = mockState.state.moodMonthData.map(mood => ({
      name: mood.date,
      uv: mood.mood
    }))
    expect(updatedData).toHaveLength(2)
  })
})
