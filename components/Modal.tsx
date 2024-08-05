'use client';

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Input from "./inputs/Input";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  onFilter?: (e: any) => void;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  disabled,
  onFilter
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);


  const handleSubmit = useCallback(() => {
      if (disabled) {
          return;
      }

      onSubmit && onSubmit();
  }, [onSubmit, disabled]);


  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div className="
          relative 
          w-full
          md:w-5/6
          lg:w-4/6
          xl:w-3/6
          my-6
          mx-auto 
          h-auto
          p-2
          lg:p-0
          lg:h-auto
          md:h-auto
          "
        >
          {/*content*/}
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-2xl 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div className="
                  flex 
                  flex-col
                  p-6
                  border-b-[1px]
                "
              >
                <div className="
                  flex 
                  items-center 
                  rounded-t
                  justify-between
                  relative
                  ">
                <div className="text-xl">
                    {title}
                  </div>
                  {!disabled && (
                    <button
                      className="
                        p-1
                        border-0 
                        hover:opacity-70
                        transition
                        left-9
                      "
                      onClick={handleClose}
                    >
                      <Image width={14} height={14} alt="close" src={'/icons/close.svg'}/>
                    </button>
                  )}
                </div>
                <div
                  className="
                    mt-4
                  "
                >
                  {onFilter && (
                    <input disabled={disabled} onChange={onFilter} placeholder="ფილტრი" className="[appearance:textfield] disabled:bg-gray-300 text-gray-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-4 py-4 w-full border rounded-xl text-base focus:outline-none"/>
                  )}
                </div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              {/*footer*/}
              {onSubmit && 
                <div className="flex flex-col gap-2 p-6">
                    <div 
                    className="
                        flex 
                        flex-row 
                        items-center 
                        gap-4 
                        w-full
                    "
                    >
                          {actionLabel &&
                              <button 
                                  disabled={disabled} 
                                  onClick={handleSubmit}
                              >{actionLabel}</button>
                          }
                    </div> 
                </div>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
