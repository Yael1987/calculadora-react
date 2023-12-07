import Icons from '/icons.svg'
import '../styles/icons.css'

interface Props{
  name: string,
  size: string,
  color: string,
}

const Icon: React.FC<Props> = ({ name, size, color }) => {
  return (
    <svg className={`icon icon--${size} icon-color--${color}`}>
      <use xlinkHref={`${Icons}#icon-${name}`}/>
    </svg>
  )
}

export default Icon