"use client";

import { useEffect, useState } from "react";
import Input from "../components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { SafeUser } from "@/types";
interface RegisterFormProps {
  currentUser: SafeUser | null;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    //npm i axios for the authentication only not for the ui
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created!", {
          id: "account-created",
        });
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/");
            router.refresh();
            toast.success("Logged in", {
              id: "logged",
            });
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((err) => toast.error("something went wrong", { id: "wrong" }))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (currentUser) {
      // Redirect if the user is already logged in
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  if (currentUser) {
    return <p className="text-center">Registered. Redirecting...</p>;
  }
  return (
    <>
      <Heading title="Sign up for Music List" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
        disabled={isLoading}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
