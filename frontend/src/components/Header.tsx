import { ChangeEventHandler, useState } from "react";
import Container from "components/Container";
import { Box, TextInput, Button, ResponsiveContext } from "grommet";
import { FormSearch, Login, Sign } from "grommet-icons";

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const onSearchKeywordChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchKeyword(event.target.value);
    console.log("Changed", event.target.value);
  };

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
            style: { position: "sticky", top: 0 },
          }}
        >
          {/* logo */}
          <Box direction="row" align="center">
            <strong style={{ fontWeight: 900 }}>Stock</strong>Price
          </Box>

          {/* search bar  */}
          <Box flex>
            <TextInput
              plain
              icon={<FormSearch />}
              placeholder="Search by Ticker..."
              value={searchKeyword}
              onChange={onSearchKeywordChange}
            />
          </Box>

          {/* login state */}
          <Button size="small" plain label="Login" />
          <Button size="small" primary label="Signin" />
        </Container>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Header;
