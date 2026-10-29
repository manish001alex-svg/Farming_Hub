import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

const UserRegister = () => {

  const {handleUserRegister} = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await handleUserRegister(formData);
      toast.success("User register successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");

    } catch (error) {
      toast.error(Object.values(error.response.data.errors)[0]);
    }

    setFormData({
      name: '',
      email: '',
      password: '',
    })
  }

  return (
    <div className='h-[92vh] flex justify-center items-center bg-[#f6f4f4]'>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Create Account
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Register to get started with FarmingHub
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       text-gray-900 outline-none
                       placeholder:text-gray-400
                       focus:border-green-600
                       focus:ring-2 focus:ring-green-100"
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
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
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       text-gray-900 outline-none
                       placeholder:text-gray-400
                       focus:border-green-600
                       focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-green-600
                     px-4 py-2.5 font-semibold text-white
                     transition hover:bg-green-700
                     focus:outline-none focus:ring-2
                     focus:ring-green-300"
          >
            Create Account
          </button>

          <p className="mt-1 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  )
}

export default UserRegister