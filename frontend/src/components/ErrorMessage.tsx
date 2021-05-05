import Message from "./Message"
import Translation from "./Translation"

const ErrorMessage = () => {
  return (
    <Message
      size="large"
      type="error"
      message={<Translation text={{ en: "Error :(", kr: "오류가 발생했습니다. :(" }} />}
    />
  )
}

export default ErrorMessage
