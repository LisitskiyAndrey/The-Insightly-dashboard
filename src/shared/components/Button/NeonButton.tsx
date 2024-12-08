import './style.scss'
import { FC } from 'react'
import cn from 'classnames'

const CLASS_NAME = 'neon-button'

const NeonButton: FC<{ title: string; isActive: boolean; onClick: () => void }> = ({ title, isActive, onClick }) => (
  <button onClick={() => onClick()} className={cn(`${CLASS_NAME}`, `${isActive ? `${CLASS_NAME}_active` : ''}`)}>
    {title}
  </button>
)

export default NeonButton
