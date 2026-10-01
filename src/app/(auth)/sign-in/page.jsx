"use client";

import { signIn } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    InputGroup,
    Label,
    TextField,
} from "@heroui/react";
import { useState } from "react";

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("form er data", data);

        const { data: resData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/",
        });

        console.log("after submit", resData, error);
    };

    return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
            <h2 className="mb-6 text-2xl font-bold">
                Please Sign in
            </h2>

            <Form
                className="flex w-full max-w-96 flex-col gap-4"
                onSubmit={onSubmit}
            >
                {/* Email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value
                            )
                        ) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>

                    <Input placeholder="john@example.com" />

                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    name="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }

                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }

                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }

                        return null;
                    }}
                >
                    <Label>Password</Label>

                    <InputGroup>
                        <InputGroup.Input
                            name="password"
                            type={isVisible ? "text" : "password"}
                            placeholder="Enter your password"
                        />

                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                aria-label={
                                    isVisible
                                        ? "Hide password"
                                        : "Show password"
                                }
                                size="sm"
                                variant="ghost"
                                type="button"
                                onPress={() =>
                                    setIsVisible(!isVisible)
                                }
                            >
                                {isVisible ? (
                                    <Eye className="size-4" />
                                ) : (
                                    <EyeSlash className="size-4" />
                                )}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>

                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1
                        number
                    </Description>

                    <FieldError />
                </TextField>

                {/* Buttons */}
                <div className="flex gap-2">
                    <Button type="submit">
                        Submit
                    </Button>

                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;