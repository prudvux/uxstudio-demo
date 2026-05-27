import { useEffect, useRef } from "react";
import { X, User, Mail } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

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
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "white",
                }}
              >
                R
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
                  Rimsha Humaira
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
                  rhumaira@uxreactor.com
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
              Profile Details
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#495059",
                  }}
                >
                  Full Name
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-[8px] border border-[#E9ECEF] bg-[#F8F8F8]">
                  <User size={15} className="text-[#9CA1AA]" strokeWidth={1.5} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  >
                    Rimsha Humaira
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#495059",
                  }}
                >
                  Email Address
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-[8px] border border-[#E9ECEF] bg-[#F8F8F8]">
                  <Mail size={15} className="text-[#9CA1AA]" strokeWidth={1.5} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  >
                    rhumaira@uxreactor.com
                  </span>
                </div>
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#495059",
                  }}
                >
                  Role
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-[8px] border border-[#E9ECEF] bg-[#F8F8F8]">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  >
                    UX Designer
                  </span>
                </div>
              </div>

              {/* Organisation */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#495059",
                  }}
                >
                  Organisation
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-[8px] border border-[#E9ECEF] bg-[#F8F8F8]">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  >
                    UXReactor
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#9CA1AA",
                  lineHeight: "18px",
                }}
              >
                Profile details are managed by your organisation administrator. Contact your admin to make changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
