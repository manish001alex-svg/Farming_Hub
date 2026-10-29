import React, { useState } from "react";
import {
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";

const DashboardHeading = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <header className="flex h-[75px] items-center justify-end border-b border-slate-200 bg-white px-9 shadow-sm">
      
      {/* Admin Profile */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="
            flex
            items-center
            gap-3
            rounded-lg
            px-2
            py-2
            transition
            hover:bg-slate-50
          "
        >
          {/* Avatar */}
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-emerald-50
            "
          >
            <User
              size={25}
              className="text-emerald-700"
              strokeWidth={2}
            />
          </div>

          {/* Admin name */}
          <span className="text-[17px] font-semibold text-slate-700">
            Admin
          </span>

          {/* Arrow */}
          <ChevronDown
            size={19}
            className={`
              text-slate-500
              transition-transform
              duration-200
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* ================= DROPDOWN ================= */}
        {open && (
          <div
            className="
              absolute
              right-0
              top-[58px]
              z-50
              w-[280px]
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-lg
            "
          >

            {/* Admin Information */}
            <div className="px-5 py-4">

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
                    bg-emerald-50
                  "
                >
                  <User
                    size={26}
                    className="text-emerald-700"
                  />
                </div>

                {/* Name + Email */}
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-semibold text-slate-800">
                    Admin
                  </p>

                  <p className="truncate text-[13px] text-slate-500">
                    admin@farminghub.com
                  </p>
                </div>

              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3.5
                text-left
                text-[15px]
                font-medium
                text-red-500
                transition
                hover:bg-red-50
              "
            >
              <LogOut size={20} />

              <span>
                Logout
              </span>
            </button>

          </div>
        )}

      </div>
    </header>
  );
};

export default DashboardHeading;