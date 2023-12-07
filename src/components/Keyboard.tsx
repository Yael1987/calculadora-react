import { memo, useEffect, useState } from "react";
import { Button as ButtonType } from "../utils/types";
import Button from "./Button"
import Icon from "./Icon"
import useButtonsValues from "../hooks/useButtonsValues";

type Props = {
  onButtonClick(event?: React.MouseEvent): void
}

const Keyboard: React.FC<Props> = memo(({ onButtonClick }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const buttons : ButtonType[] = useButtonsValues(isMobile)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800)
    }

    window.addEventListener('resize', handleResize)
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  return (
    <div className="container-btns">
      {buttons.map((btn) => (
        <Button key={btn.value} color={btn.color} value={btn.value} type="action" onClick={onButtonClick}>
          {btn.icon ? (
            <Icon name={btn.icon} color={`${btn.color === "main" ? "white" : "dark"}`} size="sm" />
          ) : (
            btn.label
          )}
        </Button>
      ))}
    </div>
  );
})

export default Keyboard