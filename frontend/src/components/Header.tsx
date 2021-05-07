import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import Container from "components/Container"
import { Box, Text, TextInput, Form, ResponsiveContext } from "grommet"
import { FormSearch } from "grommet-icons"
import { useHistory, useLocation } from "react-router-dom"
import globalVariable from "etc/globalVariable"

const Logo = () => {
  const history = useHistory()
  const handleLogoClick = () => {
    history.push("/")
  }
  return (
    <Box direction="row" align="center" onClick={handleLogoClick}>
      <Text color="neutral-1">
        <strong style={{ fontWeight: 900 }}>Stock</strong>Price
      </Text>
    </Box>
  )
}

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (searchKeyword) history.push(`/search/${searchKeyword}`)
  }, [searchKeyword, history])

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "search") {
      setFocused(false)
      setSearchKeyword("")
    }
  }, [location])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchKeyword(event.target.value)
  }
  const handleIconClick = () => {
    setFocused(!focused)
    if (inputRef && inputRef.current) inputRef.current.focus()
  }

  return (
    <Box flex fill direction="row" align="center" justify="end">
      <FormSearch color="neutral-1" onClick={handleIconClick} style={{ cursor: "pointer" }} />
      <Form id="searchBar__form" className={focused ? "focused" : ""}>
        <TextInput ref={inputRef} plain placeholder="Search by ticker..." value={searchKeyword} onChange={handleChange} />
      </Form>
    </Box>
  )
}

const Header = () => {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Container
          align="center"
          direction="row"
          pad={{ horizontal: "medium", vertical: "xsmall" }}
          gap="small"
          wrapperProps={{
            background: "brand",
            style: { position: "sticky", top: 0, zIndex: 1 },
            elevation: "small",
          }}
        >
          <Logo />
          <SearchBar />
        </Container>
      )}
    </ResponsiveContext.Consumer>
  )
}

export default Header
