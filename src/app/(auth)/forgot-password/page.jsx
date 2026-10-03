"use client";

import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { addToast } from "@heroui/toast"; // 👈 Import from @heroui/toast
import { requestPasswordReset } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("User data before submit", userData);

    const { data, error } = await requestPasswordReset({
      body: {
        email: userData.email,
        redirectTo: "/reset-password",
      },
    });

    if (error) {
      addToast({
        title: "Error",
        description: error.message || "Something went wrong",
        color: "danger",
      });
      return;
    }

    addToast({
      title: "Success",
      description: "An email is sent to your email address. Please check.",
      color: "success",
    });
    console.log("after sending reset email", data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={handleForgotPassword}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}