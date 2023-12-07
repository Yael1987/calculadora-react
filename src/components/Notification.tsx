import { useEffect, useState } from "react";
import "../styles/notification.css"

interface Props{
  message: string,
  clearMessage(): void
}

const Notification: React.FC<Props> = ({ message, clearMessage }) => {
  const [isNotification, setIsNotification] = useState<boolean>(false);

  useEffect(() => {
    if (message !== "") { 
      setIsNotification(state => !state)
      
      setTimeout(() => {
        setIsNotification(false)  
      }, 1200)

      setTimeout(() => {
        clearMessage()
      }, 1500)
    }
  }, [message, clearMessage])

  return (
    <div className={`notification ${isNotification ? "display-notification" : ""}`}>
      <p className="notification-text">{message}</p>
    </div>
  );
}

export default Notification
