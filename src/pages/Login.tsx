import { singInWithGoogle } from "firebaseConfig/fb";
import { Box, Button } from "grommet";
import useUserContext from "hooks/useUserContext";

const PageLogin = () => {
  const { setUser } = useUserContext();

  const handleGoogleLogin = () => {
    singInWithGoogle().then((res) => {
      setUser(res.user);
    });
  };
  return (
    <Box>
      <Button onClick={handleGoogleLogin} label="Sign in with Google" />
    </Box>
  );
};

export default PageLogin;
