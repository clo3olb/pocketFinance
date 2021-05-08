import React from "react"
import { Card, CardHeader, CardBody, CardFooter } from "components/Card"
import { BoxTypes, Text } from "grommet"
import { Alert } from "grommet-icons"
import Translation from "components/Translation"
import { LanguageType } from "components/Translation"

type HeaderProps = {
  icon: React.ReactNode
  title: LanguageType
}

const Header: React.FC<HeaderProps> = ({ icon, title }) => {
  return (
    <CardHeader>
      {icon}
      <Text weight="bold" size="large" color="neutral-1">
        <Translation text={title} />
      </Text>
    </CardHeader>
  )
}

type BodyProps = {
  body: BoxTypes | undefined
}

const Body: React.FC<BodyProps> = ({ body, children }) => {
  return <CardBody {...body}>{children}</CardBody>
}

const Footer = () => {
  return (
    <CardFooter justify="start" background="light-3">
      <Alert />
      <Text>
        <Translation text={{ en: "The data might not be up to date.", kr: "최신정보가 아닐 수 있습니다." }} />
      </Text>
    </CardFooter>
  )
}

type StockDetailCardTemplateProps = {
  header: HeaderProps
  body?: BoxTypes
}

const StockDetailCardTemplate: React.FC<StockDetailCardTemplateProps> = ({ header, body, children }) => {
  return (
    <Card animation={["slideUp", "fadeIn"]}>
      <Header {...header} />
      <Body body={body}>{children}</Body>
      <Footer />
    </Card>
  )
}

export default StockDetailCardTemplate
