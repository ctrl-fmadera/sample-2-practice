import React from 'react'
import { Input, Button, Field, Box } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import"../Registrationpage.css"

const Registrationpage = () => {
    const schema = yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required").min(4, "Password must be at least 4 characters").max(20, "Password must be at most 20 characters"),
    });

    const form = useForm({
        resolver: yupResolver(schema)
    });
    const { register, handleSubmit, formState: { errors } } = form;

    const onSubmit = (data) => {
        console.log("Form submitted", data);
    }

    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
                <label htmlFor="username">Username:</label>
                <Input type="text" id="username" name="username" {...register("username")} />
                {errors.username && <p className="error">{errors.username.message}</p>}

                <label htmlFor="password">Password:</label>
                <Input type="password" id="password" name="password" {...register("password")} />
                {errors.password && <p className="error">{errors.password.message}</p>}

                <Button type="submit">Register</Button>
            </form>
        </div>
    )
}

export default Registrationpage
