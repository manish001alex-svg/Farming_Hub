import { useDispatch, useSelector } from "react-redux"
import { login, me, register, registerUser } from "../service/auth.api";
import { setLoading, setUser } from "../state/auth.slice";
import { useCrops } from "../../crops/hooks/useCrops";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { handleGetAllSavedCrops } = useCrops();

    const handleRegister = async ({ name, email, password }) => {
        try {
            const data = await register({ name, email, password });
            dispatch(setUser(data.user));
        } catch (error) {
            throw error;
        }
    }

    const handleUserRegister = async ({ name, email, password }) => {
        try {
            const data = await registerUser({ name, email, password });
            dispatch(setUser(data.user));
        } catch (error) {
            throw error;
        }
    }

    const handlelogin = async ({ email, password }) => {
        try {
            dispatch(setLoading(true));
            const data = await login({ email, password });
            dispatch(setUser(data));
        } catch (error) {
            throw error;
        }
        finally {
            dispatch(setLoading(false));
        }
    }


    const handleMe = async () => {
        try {
            dispatch(setLoading(true));

            const data = await me();

            dispatch(setUser(data));
            await handleGetAllSavedCrops(data);

        } catch (error) {
            console.log("Error:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { handleRegister, handleUserRegister, handlelogin, handleMe, user }
}