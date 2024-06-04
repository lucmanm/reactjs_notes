import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios-instance";
import { registerSchmema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchmema>>({
    resolver: zodResolver(registerSchmema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof registerSchmema>> = async (data) => {
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      if (response.data && response.data.error) {
        console.log("====================================");
        console.log(response.data.message);
        console.log("====================================");
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log("====================================");
      console.log("ERROR_HANDLE_SUBMIT_CREATE_ACCOUNT", error);
      console.log("====================================");
    }
  };
  return (
    <section className="flex-1 lg:grid lg:grid-cols-2  border-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Regsiter Now</h1>
            <p className="text-balance text-muted-foreground">Create your account</p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  {...register("fullName")}
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                />
                <span className="text-xs text-red-500">{errors && errors.fullName?.message}</span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} id="email" type="email" placeholder="m@example.com" />
                <span className="text-xs text-red-500">{errors && errors.email?.message}</span>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input {...register("password")} id="password" type="password" />
              </div>
              <div className="grid gap-2 py-4">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
}
