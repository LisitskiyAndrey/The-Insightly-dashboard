import { FC } from 'react'
import './style.scss'
import cn from 'classnames'
import FaceIcon from '../FaceIcon/FaceIcon.tsx'

const CLASS_NAME = 'svg-button'

interface SvgButtonProps {
  onClick: () => void
  mood: number
  title?: string
}

const FaceSvgButton: FC<SvgButtonProps> = ({ onClick, mood, title }) => (
  <FaceIcon title={title} moodScore={mood} onClick={onClick} className={cn(`${CLASS_NAME} ${CLASS_NAME}__${mood}`)} />
)

export default FaceSvgButton
