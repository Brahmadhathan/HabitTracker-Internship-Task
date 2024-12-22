import AuthButton from "@/components/Auth/AuthButton";
import AuthHeader from "@/components/Auth/AuthHeader";
import Input from "@/components/Auth/Input";
import { Fingerprint, Mail, UserRoundPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/types/user";
import axios from "axios";
import { apiUrl } from "@/constants/api";
import { Link, useNavigate } from "react-router-dom";
type SignupFormData = z.infer<typeof createUser>;

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(createUser),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await axios.post(`${apiUrl}/user/signup`, data);
      const resData = res.data;
      if (resData.status) {
        navigate("/signin");
      }
    } catch (error) {}
  };

  return (
    <motion.div className="bg-gray-50 h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:pt-16 h-4/6 bg-white w-full shadow-lg rounded-2xl max-w-96 md:max-w-lg mx-3 md:mx-auto px-5 py-5 md:px-0 md:py-5"
      >
        <AuthHeader
          title={"Create an account"}
          tagline="Start your journey to better habits"
        />
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full max-w-sm">
            <Input
              Icon={<UserRoundPen className="w-5 h-5 text-gray-600" />}
              placeholder="Your Name"
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full max-w-sm mt-4">
            <Input
              Icon={<Mail className="w-5 h-5 text-gray-600" />}
              placeholder="Email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full max-w-sm mt-4">
            <Input
              Icon={<Fingerprint className="w-5 h-5 text-gray-600" />}
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <AuthButton text={"Create Account"} />
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Signup;
