import { Text } from "grommet"
import { Alert, StatusCritical, StatusGood, CircleInformation } from "grommet-icons"
import { Card, CardHeader } from "components/Card"

type MessageType = "error" | "warning" | "ok" | "unknown"
type MessageProps = {
  type?: MessageType
  message: string | React.ReactNode
  size?: "large"
}

const Message: React.FC<MessageProps> = ({ type = "unknown", message, size }) => {
  return (
    <Card animation={["fadeIn", "slideUp"]}>
      <CardHeader
        pad={size ? size : "small"}
        justify="start"
        direction={size === "large" ? "column" : "row"}
        background={`status-${type}`}
      >
        {type === "error" && <StatusCritical size={size} />}
        {type === "warning" && <Alert size={size} />}
        {type === "ok" && <StatusGood size={size} />}
        {type === "unknown" && <CircleInformation size={size} />}
        <Text weight={size ? "bold" : undefined}>{message}</Text>
      </CardHeader>
    </Card>
  )
}

export default Message
