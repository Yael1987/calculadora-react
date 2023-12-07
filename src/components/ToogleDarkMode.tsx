import { useEffect, useState } from "react";
import Icon from "./Icon";
import Button from "./Button";
import storage from "../features/storage/Storage";

const ToogleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(storage.getIsDarkMode())

  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.remove("dark")
      document.body.classList.add("light")
    } else {
      document.body.classList.remove("light")
      document.body.classList.add("dark")
    }
  }, [isDarkMode])

  const handleToogleDark = () => {
    setIsDarkMode(theme => !theme)
    storage.updateSavedTheme(!isDarkMode)
  }

  return (
    <Button onClick={handleToogleDark}>
      {isDarkMode
        ? (
          <Icon name="sun" color="main" size="lg" />
        ) : (
          <Icon name="moon" color="main" size="lg" />
        ) }
    </Button>
  );  
}

export default ToogleDarkMode
