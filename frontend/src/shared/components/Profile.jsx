
import {
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);

  // Later get these from your logged-in user/auth state
  const userName = "User";
  const userEmail = "user@example.com";

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="relative">

      {/* ================= PROFILE BUTTON ================= */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          transition-all
          duration-200
          cursor-pointer
        "
      >

        {/* Avatar */}
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#dcebd4]
            ring-2
            ring-[#6f965c]
          "
        >
          <User
            size={22}
            className="text-[#39542c]"
            strokeWidth={2.2}
          />
        </div>

      </button>


      {/* ================= DROPDOWN ================= */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-[58px]
            z-50
            w-[290px]
            overflow-hidden
            rounded-2xl
            border
            border-[#dce8d7]
            bg-white
            shadow-[0_12px_35px_rgba(57,84,44,0.20)]
          "
        >

          {/* ================= USER INFO ================= */}
          <div className="bg-[#f3f8f0] px-5 py-5">

            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#dcebd4]
                  ring-2
                  ring-[#b8cfad]
                "
              >
                <User
                  size={25}
                  className="text-[#39542c]"
                />
              </div>

              {/* Name + Email */}
              <div className="min-w-0">

                <p className="truncate text-[16px] font-bold text-[#263a20]">
                  {userName}
                </p>

                <p className="mt-0.5 truncate text-[13px] text-[#71816b]">
                  {userEmail}
                </p>

              </div>

            </div>

          </div>


          {/* Green Accent */}
          <div className="h-[2px] bg-[#5f8a4d]" />


          {/* ================= LOGOUT ================= */}
          <div className="p-3">

            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-left
                text-[14px]
                font-semibold
                text-red-500
                transition-all
                duration-200
                hover:bg-red-50
                hover:text-red-600
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                "
              >
                <LogOut size={18} />
              </div>

              <span>
                Logout
              </span>

            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Profile;
