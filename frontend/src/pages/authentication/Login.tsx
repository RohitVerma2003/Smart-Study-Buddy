import { useState } from "react";
import { Button } from "../../../components/ui/button";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Spinner } from "../../../components/ui/spinner";

const UserSchema = z.object({
    email: z.email({ message: "Please enter a valid email" }),
    password: z.string().trim().min(8, { error: "Password should have minimum length 8" })
})

const Login = () => {
    const [form, setForm] = useState<{
        email: string;
        password: string;
    }>({ email: "", password: "" });

    const [errors, setErrors] = useState<{
        email?: string[];
        password?: string[];
    }>({});

    const { login, loading } = useAuth();

    const handleSubmit = async () => {
        const result = UserSchema.safeParse(form);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        setErrors({});
        await login(result.data);
    };

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        setForm((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="flex justify-center items-center w-full h-[100vh]">
            <div className="p-5 border-1 border-gray-500 rounded-lg w-1/3 bg-white">
                <div className="w-full text-center mb-3 text-lg">Log in</div>
                <p className="mb-3">
                    <label htmlFor="email" className=" text-sm ml-1">Email</label>
                    <input type="email" id="email" name="email" className="outline-none border-1 border-gray-500 p-2 rounded-md w-full" value={form.email} onChange={handleChange} />
                    {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email}</span>}
                </p>
                <p className="mb-3">
                    <label htmlFor="password" className=" text-sm ml-1">Password</label>
                    <input type="password" id="password" name="password" className="outline-none border-1 border-gray-500 p-2 rounded-md w-full" value={form.password} onChange={handleChange} />
                    {errors.password && <span className="text-xs text-red-500 ml-1">{errors.password}</span>}
                </p>
                <p className="mb-2">
                    {loading ?
                        <Button className="w-full bg-green-500 cursor-pointer" size={'lg'} disabled><Spinner data-icon="inline-start" /></Button> :
                        <Button className="w-full bg-green-500 cursor-pointer" size={'lg'} onClick={handleSubmit}>Log in</Button>
                    }
                </p>
                <span className="text-sm">Not have an account? Please <Link className="text-blue-500" replace to={'/signup'}>Sign up</Link></span>
            </div>
        </div>
    )
}

export default Login