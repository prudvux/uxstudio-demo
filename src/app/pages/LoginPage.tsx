import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import UXStudioLogo from "../../imports/UX_Studio_LOGO.svg";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/app");
    }, 800);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left panel - dark with blue gradient */}
      <div
        className="relative flex-1 flex items-center justify-center px-[60px] py-8 overflow-hidden"
        style={{ background: "#010203" }}
      >
        {/* Background glow blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 709,
            height: 708,
            borderRadius: "50%",
            background:
              "conic-gradient(from 90deg, rgba(168,210,241,0.18) 0%, rgba(7,89,178,0.18) 100%)",
            filter: "blur(80px)",
            bottom: -300,
            left: -100,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "conic-gradient(from 90deg, rgba(168,210,241,0.12) 0%, rgba(7,89,178,0.12) 100%)",
            filter: "blur(80px)",
            top: -350,
            left: -200,
          }}
        />

        {/* Centered content container */}
        <div className="relative flex flex-col gap-10 max-w-[520px]">
          {/* Logo */}
          <div>
            <img
              src={UXStudioLogo}
              alt="UXstudio"
              style={{ height: 20, width: "auto", filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Hero heading */}
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 56,
              color: "white",
              letterSpacing: "-1.12px",
              lineHeight: "64px",
            }}
          >
            Do your best UX work. Faster. Greater. Better.
          </h1>
        </div>
      </div>

      {/* Right panel - white with form */}
      <div className="bg-white flex-1 flex items-center justify-center px-8">
        <div className="w-[380px] flex flex-col gap-8">
          {/* Header - Logo */}
          <div className="flex flex-col gap-5">
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 24,
                color: "#333A42",
                lineHeight: "32px",
              }}
            >
              Login to your account.
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            {/* Email field */}
            <div className="flex flex-col gap-1">
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#616874",
                  lineHeight: "20px",
                }}
              >
                Email
              </label>
              <div
                className="relative rounded-[12px] bg-[#FDFDFD] border border-[#9CA1AA]"
                style={{ borderRadius: 12 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-[14px] bg-transparent outline-none"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#333A42",
                    borderRadius: 12,
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1">
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#616874",
                  lineHeight: "20px",
                }}
              >
                Password
              </label>
              <div
                className="relative rounded-[12px] bg-[#FDFDFD] border border-[#9CA1AA] flex items-center"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 px-5 py-[14px] bg-transparent outline-none"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#333A42",
                    borderRadius: 12,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-5 text-[#898E99] hover:text-[#495059] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[44px] rounded-[8px] flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-70"
              style={{
                background: "linear-gradient(173.92deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#F8F9FA",
                  lineHeight: "24px",
                }}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </span>
            </button>
          </form>

          <p
            className="text-center"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#9CA1AA",
            }}
          >
            Contact admin to get login credentials.
          </p>
        </div>
      </div>
    </div>
  );
}