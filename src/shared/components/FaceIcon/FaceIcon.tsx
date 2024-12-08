import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import './style.scss'
import { EMood } from '../../const.tsx'

interface SvgIconProps {
  moodScore: number
  onClick?: () => void
  className?: string
  title?: string
}

const CLASS_NAME = 'face-icon'
const FaceIcon: FC<SvgIconProps> = ({ title, moodScore, onClick, className }) => {
  const [moodFace, setMoodFace] = useState(0)
  useEffect(() => {
    if (moodScore >= EMood.Happy) {
      setMoodFace(EMood.Happy)
    } else if (moodScore < EMood.Happy && moodScore >= EMood.Neutral) {
      setMoodFace(EMood.Neutral)
    } else {
      setMoodFace(EMood.Sad)
    }
  }, [moodScore])
  return (
    <svg
      onClick={onClick}
      className={cn(`${CLASS_NAME}`, `${CLASS_NAME}__${moodFace}`, className)}
      viewBox="0 0 24 24"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#000000"
    >
      <path
        d={
          moodScore >= EMood.Happy
            ? 'M7.3010863,14.0011479 C8.0734404,15.7578367 9.98813711,17 11.9995889,17 C14.0024928,17 15.913479,15.7546194 16.6925307,14.0055328'
            : moodScore < EMood.Happy && moodScore >= EMood.Neutral
              ? 'M7,14 L17,14'
              : 'M8,16 C9.33333333,15.3333333 10.6656028,15.0003822 11.9968085,15.0011466 C13.3322695,15.0003822 14.6666667,15.3333333 16,16'
        }
      />
      <title>{title}</title>
      <line strokeLinecap="round" x1="9" y1="9" x2="9" y2="9" />
      <line strokeLinecap="round" x1="15" y1="9" x2="15" y2="9" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

export default FaceIcon
