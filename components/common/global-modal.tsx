"use client";
import React, { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { createPortal } from "react-dom";

type TProps = {
  open: boolean;
  children?: ReactNode;
  triggerText?: string | ReactNode;
  title?: string | ReactNode;
  className?: string;
  customTitle?: string | ReactNode;
  withFooter?: ReactNode;
  subTitle?: string;
  setOpen: (_: boolean) => void;
  ngClass?: string;
  showHeader?: boolean; // Optional boolean to toggle header
};

const GlobalModal = React.forwardRef<HTMLDivElement, TProps>(
  (
    {
      open,
      children,
      ngClass,
      setOpen,
      title = "New Modal",
      className,
      subTitle,
      customTitle,
      withFooter,
      showHeader = true,
    },
    ref
  ) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    return (
      <>
        {createPortal(
          open && (
            <div
              id="global_modal"
              ref={ref}
              className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-[50]"
            >
              <div
                className={cn(
                  " border border-black bg-black/30 shadow-xl rounded-lg w-[90vw] sm:w-[600px] md:w-[700px] lg:w-[800px] max-w-[95%] sm:max-w-[90%] max-h-[90vh] relative flex flex-col",
                  className
                )}
              >
                {/* Header */}
                {customTitle
                  ? customTitle
                  : showHeader &&
                    (title || subTitle) && (
                      <div className="flex items-center justify-between border-b border-forground-border px-3 py-3 pb-2 sticky top-0 rounded-tr-lg rounded-tl-lg flex-wrap gap-2 bg-black/30">
                        <div>
                          {title && (
                            <h3 className="text-black font-medium text-sm md:text-lg lg:text-xl">
                              {title}
                            </h3>
                          )}
                          {subTitle && (
                            <p className="text-xs text-gray font-light">
                              {subTitle}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                {/* Body */}
                <div
                  className={cn(
                    "p-4 flex-1 h-full min-h-20 overflow-y-auto",
                    ngClass
                  )}
                >
                  {children}
                </div>

                {/* Footer */}
                {withFooter && (
                  <div className="px-3 py-2 pb-2 sticky bottom-0 rounded-br-lg rounded-bl-lg flex-wrap gap-2 bg-black/30">
                    {withFooter}
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute bg-black  group cursor-pointer rounded-full -right-3 bg-warning size-6 flex items-center justify-center -top-3"
                >
                  <XIcon
                    className="text-slate-50 group-hover:rotate-90 transition-all text-sm"
                    size={20}
                  />
                </button>
              </div>
            </div>
          ),
          document.body
        )}
      </>
    );
  }
);

GlobalModal.displayName = "Modal";

export default GlobalModal;
