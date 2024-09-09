"use client";

import { useEffect, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";
interface LogInFormProps {
  currentUser: SafeUser | null;
}
const LogInForm: React.FC<LogInFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged in", {
          id: "logged",
        });
      }
      if (callback?.error) {
        toast.error(callback.error);
        setIsLoading(false);
      }
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
    return <p className="text-center">Logged in. Redirecting..</p>;
  }
  return (
    <>
      <Heading title="Sign in to Music List" />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />

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
        label={isLoading ? "Loading..." : "Log in"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
      <p className="text-sm">
        Don’t have an account?
        <Link className="underline" href="/register">
          {" "}
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LogInForm;
