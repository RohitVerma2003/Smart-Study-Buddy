import { useState } from "react";
import { Button } from "../../../components/ui/button";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Spinner } from "../../../components/ui/spinner";
import { useAuth } from "../../contexts/AuthContext";

const UserSchema = z.object({
    name: z.string().trim().min(5, { error: "Name is too short" }).max(25, { error: "Name is too long" }),
    email: z.email({ message: "Please enter a valid email" }),
    password: z.string().trim().min(8, { error: "Password should have minimum length 8" }),
    confirmPassword: z.string().trim().min(8, { error: "Password should have minimum length 8" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
});

const SignUp = () => {
    const {signup , loading} = useAuth();

    const [form, setForm] = useState<{
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }>({ name: "", email: "", password: "", confirmPassword: "" });

    const [errors, setErrors] = useState<{
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    }>({});

    const handleSubmit = async () => {
        const result = UserSchema.safeParse(form);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        setErrors({});
        await signup(result.data)
    };

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        setForm((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="flex justify-center items-center w-full h-[100vh]">
            <div className="p-5 border-1 border-gray-500 rounded-lg w-1/3 bg-white">
                <div className="w-full text-center mb-3 text-lg">Sign Up</div>
                <p className="mb-3">
                    <label htmlFor="name" className=" text-sm ml-1">Name</label>
                    <input type="text" id="name" name="name" className="outline-none border-1 border-gray-500 p-2 rounded-md w-full" value={form.name} onChange={handleChange} />
                    {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name}</span>}
                </p>
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
                <p className="mb-3">
                    <label htmlFor="confirmPassword" className=" text-sm ml-1">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" className="outline-none border-1 border-gray-500 p-2 rounded-md w-full" value={form.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <span className="text-xs text-red-500 ml-1">{errors.confirmPassword}</span>}
                </p>
                <p className="mb-2">
                    
                    {loading ?
                        <Button className="w-full bg-green-500 cursor-pointer" size={'lg'} disabled><Spinner data-icon="inline-start" /></Button> :
                        <Button className="w-full bg-green-500 cursor-pointer" size={'lg'} onClick={handleSubmit}>Sign up</Button>
                    }
                </p>
                <span className="text-sm">Already have an account? Please <Link className="text-blue-500" replace to={'/login'}>Log in</Link></span>
            </div>
        </div>
    )
}

export default SignUp