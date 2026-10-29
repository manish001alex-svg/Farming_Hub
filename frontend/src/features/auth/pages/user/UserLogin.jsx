import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UserLogin = () => {

  const { handlelogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChande = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData, [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await handlelogin(formData);
      toast.success("Login successfully!");

      setFormData({
        email: "",
        password: "",
      });

      navigate("/");

    } catch (error) {
      toast.error(Object.values(error.response.data.errors)[0]);
    }

  }

  return (
    <main className='h-[92vh] flex justify-center items-center bg-[#f6f4f4]'>


      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Login to your FarmingHub account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChande}
              value={formData.email}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       text-gray-900 outline-none
                       placeholder:text-gray-400
                       focus:border-green-600
                       focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <a
                href="/forgot-password"
                className="text-sm font-medium text-green-600 hover:text-green-700"
              >
                Forgot Password?
              </a>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChande}
              value={formData.password}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       text-gray-900 outline-none
                       placeholder:text-gray-400
                       focus:border-green-600
                       focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-green-600 px-4 py-2.5
                     font-semibold text-white
                     transition hover:bg-green-700
                     focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  )
}

export default UserLogin;