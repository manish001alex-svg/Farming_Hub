import { createBrowserRouter } from "react-router";
import AppLayout from "../app/AppLayout";
import Protected from "../features/auth/components/Protected";
import AdminProtected from "../features/auth/components/AdminProtected";
import CropCreationPage from "../features/crops/pages/admin/CropCreationPage";
import AdminDashboard from "../features/crops/pages/admin/AdminDashboard";
import AdminItemList from "../features/crops/pages/admin/AdminItemList";
import AdminCropDetailsPage from "../features/crops/pages/admin/AdminCropDetailsPage";

import AdminLayout from "./AdminLayout";
import AdminHome from "../shared/pages/AdminHome";
import Login from "../features/auth/pages/admin/Login";
import Register from "../features/auth/pages/admin/Register";
import UserRegister from "../features/auth/pages/user/UserRegister";
import UserLogin from "../features/auth/pages/user/UserLogin";
import UserHome from "../shared/pages/UserHome";
import CropsPages from "../features/crops/pages/user/CropsPages";
import CropDetailsPage from "../features/crops/pages/user/CropDetailsPage";
import SavedPage from "../features/crops/pages/user/SavedPage";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <UserHome />
    },
    {
        element: <AppLayout />,
        children: [
            {
                path: "/crops",
                element: <CropsPages />
            },
            {
                path: "/crops/:id",
                element: <CropDetailsPage />
            },
            {
                path: "/saved",
                element: <SavedPage />
            },
            {
                path: "/Profile"
            },
            {
                path: "/register",
                element: <UserRegister />
            },
            {
                path: "/login",
                element: <UserLogin />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminHome />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },
    {
        path: "/admin/dashboard",
        element: <AdminProtected><AdminDashboard /></AdminProtected>,
        children: [
            {
                index: true,
                element: <AdminItemList />
            },
            {
                path: "create",
                element: <CropCreationPage />
            },
            {
                path: ":id",
                element: <AdminCropDetailsPage />
            }

        ]
    },
])