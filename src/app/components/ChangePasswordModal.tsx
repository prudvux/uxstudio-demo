import { useState, useEffect, useRef } from "react";
import { X, Lock, Eye, EyeOff, Check } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setPasswordForm({ current: "", newPass: "", confirm: "" });
      setSaved(false);
    }
  }, [isOpen]);

  const passwordsMatch =
    passwordForm.newPass &&
    passwordForm.confirm &&
    passwordForm.newPass === passwordForm.confirm;

  const handlePasswordSave = () => {
    if (passwordForm.current && passwordForm.newPass && passwordsMatch) {
      setSaved(true);
      setPasswordForm({ current: "", newPass: "", confirm: "" });
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.35)" }}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      >
        <div
          className="relative flex flex-col rounded-[16px] bg-white overflow-hidden"
          style={{
            width: 460,
            maxHeight: "90vh",
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E9ECEF]">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: "linear-gradient(135deg, #1F73CF 0%, #1A62B2 100%)",
                }}
              >
                <Lock size={20} strokeWidth={1.5} color="white" />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#333A42",
                    lineHeight: "22px",
                  }}
                >
                  Change Password
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#6A757E",
                    lineHeight: "18px",
                  }}
                >
                  Update your account password
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-[6px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Tab label */}
          <div className="flex border-b border-[#E9ECEF] px-6">
            <div
              className="px-1 py-3 mr-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#1F73CF",
                borderBottom: "2px solid #1F73CF",
                marginBottom: -1,
              }}
            >
              Update Password
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="flex flex-col gap-5">
              {saved && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-[8px] bg-[#F0FDF4] border border-[#86EFAC]">
                  <Check size={14} className="text-[#16A34A]" />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#16A34A",
                    }}
                  >
                    Password updated successfully
                  </span>
                </div>
              )}

              {/* Current password */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#495059",
                  }}
                >
                  Current Password
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-[8px] border border-[#CED4DA] bg-[#FDFDFD] focus-within:border-[#1F73CF] focus-within:ring-1 focus-within:ring-[#1F73CF]/20 transition-all">
                  <Lock size={15} className="text-[#9CA1AA] shrink-0" strokeWidth={1.5} />
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={passwordForm.current}
                    onChange={(e) =>
                      setPasswordForm((p) => ({ ...p, current: e.target.value }))
                    }
                    placeholder="Enter current password"
                    className="flex-1 outline-none bg-transparent"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="text-[#9CA1AA] hover:text-[#495059] transition-colors"
                  >
                    {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#495059",
                  }}
                >
                  New Password
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-[8px] border border-[#CED4DA] bg-[#FDFDFD] focus-within:border-[#1F73CF] focus-within:ring-1 focus-within:ring-[#1F73CF]/20 transition-all">
                  <Lock size={15} className="text-[#9CA1AA] shrink-0" strokeWidth={1.5} />
                  <input
                    type={showNew ? "text" : "password"}
                    value={passwordForm.newPass}
                    onChange={(e) =>
                      setPasswordForm((p) => ({ ...p, newPass: e.target.value }))
                    }
                    placeholder="Enter new password"
                    className="flex-1 outline-none bg-transparent"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="text-[#9CA1AA] hover:text-[#495059] transition-colors"
                  >
                    {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#495059",
                  }}
                >
                  Confirm New Password
                </label>
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-[8px] border bg-[#FDFDFD] focus-within:ring-1 transition-all"
                  style={{
                    borderColor:
                      passwordForm.confirm && !passwordsMatch ? "#DC2626" : "#CED4DA",
                  }}
                >
                  <Lock size={15} className="text-[#9CA1AA] shrink-0" strokeWidth={1.5} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={passwordForm.confirm}
                    onChange={(e) =>
                      setPasswordForm((p) => ({ ...p, confirm: e.target.value }))
                    }
                    placeholder="Confirm new password"
                    className="flex-1 outline-none bg-transparent"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-[#9CA1AA] hover:text-[#495059] transition-colors"
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {passwordForm.confirm && !passwordsMatch && (
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#DC2626",
                    }}
                  >
                    Passwords don't match
                  </p>
                )}
              </div>

              <button
                onClick={handlePasswordSave}
                disabled={!passwordsMatch || !passwordForm.current}
                className="w-full h-[44px] rounded-[8px] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "white",
                }}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
