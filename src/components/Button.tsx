import '../styles/buttons.css'

interface Props {
  children: JSX.Element | string,
  type?: string,
  color?: string,
  className?: string,
  onClick?: (event?: React.MouseEvent) => void,
  value?: string
}

const Button = ({children, type = "", onClick, color, value, className}: Props): JSX.Element => {
  return (
    <button
      className={`btn ${type ? `btn--${type}` : ""} ${color ? `btn-color--${color}` : ""} ${className}`}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button