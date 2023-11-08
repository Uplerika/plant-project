import { useSelector } from "react-redux"
import { RootState } from "../redux/store"


const useAuth = () => {
  const {email, token, id} = useSelector((state: RootState) => state.auth);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}

export default useAuth