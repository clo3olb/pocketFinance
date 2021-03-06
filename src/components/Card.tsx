import React from "react"
import { Card as GCard, CardHeader as GCardHeader, CardBody as GCardBody, CardFooter as GCardFooter, BoxTypes, ResponsiveContext } from "grommet"

const pad = "medium"

export const Card: React.FC<BoxTypes> = (props) => {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <GCard animation="fadeIn" background="#fcfcfc" round={size !== "small" ? "small" : "none"} {...props}>
          {props.children}
        </GCard>
      )}
    </ResponsiveContext.Consumer>
  )
}

export const CardHeader: React.FC<BoxTypes> = (props) => {
  return (
    <GCardHeader pad={pad} direction="row" gap="small" justify="start" {...props}>
      {props.children}
    </GCardHeader>
  )
}
export const CardBody: React.FC<BoxTypes> = (props) => {
  return (
    <GCardBody pad={pad} {...props}>
      {props.children}
    </GCardBody>
  )
}
export const CardFooter: React.FC<BoxTypes> = (props) => {
  return (
    <GCardFooter pad={pad} background="light-2" {...props}>
      {props.children}
    </GCardFooter>
  )
}
