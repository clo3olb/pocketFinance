import { ChangeEventHandler, useState } from "react";
import Container from "components/Container";
import { Box, TextInput, Form, Button, ResponsiveContext } from "grommet";
import { FormSearch } from "grommet-icons";
import { useHistory } from "react-router-dom";

const Logo = () => {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push("/");
  };
  return (
    <Box direction="row" align="center" onClick={handleLogoClick}>
      <strong style={{ fontWeight: 900 }}>Stock</strong>Price
    </Box>
  );
};

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const onSearchKeywordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchKeyword(event.target.value);
  };
  const handleSubmit = () => {
    history.push(searchKeyword);
  };

  return (
    <Box flex>
      <Form onSubmit={handleSubmit}>
        <TextInput plain icon={<FormSearch />} placeholder="Search by Ticker..." value={searchKeyword} onChange={onSearchKeywordChange} />
      </Form>
    </Box>
  );
};

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

          {/* login state */}
          <Button size="small" plain label="Login" />
          <Button size="small" primary label="Signin" />
        </Container>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Header;
