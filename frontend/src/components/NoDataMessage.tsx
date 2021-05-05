import Message from "./Message"
import Translation from "./Translation"

const NoDataMessage = () => {
  return (
    <Message
      size="large"
      type="unknown"
      message={<Translation text={{ en: "No Data Found", kr: "데이터를 찾을 수 없습니다." }} />}
    />
  )
}

export default NoDataMessage
