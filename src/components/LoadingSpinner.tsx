import { Box, Spinner } from "grommet"

const LoadingSpinner = () => {
  return (
    <Box flex justify="center" align="center">
      <Spinner size="large" />
    </Box>
  )
}

export default LoadingSpinner
