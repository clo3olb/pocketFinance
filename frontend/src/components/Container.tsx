import { Box, BoxTypes } from "grommet";

type ContainerType = BoxTypes & { wrapperProps?: BoxTypes };

const Container: React.FC<ContainerType> = (props) => {
  return (
    <Box fill="horizontal" align="center" {...props.wrapperProps}>
      <Box
        width="800px"
        pad={{ horizontal: "medium", vertical: "medium" }}
        {...props}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Container;
