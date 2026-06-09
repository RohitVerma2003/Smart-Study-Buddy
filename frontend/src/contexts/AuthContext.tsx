import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { api } from "../services/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type User = {
    userId: string;
    email: string;
};

type LoginData = {
    email: string;
    password: string;
};

type SignupData = {
    name: string;
    email: string;
    password: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;

    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,

    login: async () => { },
    signup: async () => { },
    logout: async () => { },
    checkAuth: async () => { },
});

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const res = await api.get("/me");
            setUser(res.data.data);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await checkAuth();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (data: LoginData) => {
        setLoading(true);

        try {
            await api.post("/login", data);
            await checkAuth();

            toast.success("Log in Successful");
            navigate('/dashboard');
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: SignupData) => {
        setLoading(true);

        try {
            await api.post("/signup", data);
            await checkAuth();
            
            toast.success("Sign up Successful");
            navigate('/dashboard');
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Signup failed"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
};