"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

interface ModalContextProps<T> {
  showModal: string;
  setShowModal: Dispatch<SetStateAction<string>>;
  modalPayload: T | undefined;
  setModalPayload: Dispatch<SetStateAction<T | undefined>>;
}

const ModalContext = createContext<ModalContextProps<any> | undefined>(
  undefined
);

interface ModalProviderProps<T> {
  children: ReactNode;
}

export const ModalContextProvider = <T = any,>({
  children,
}: ModalProviderProps<T>) => {
  const [showModal, setShowModal] = useState<string>("");
  const [modalPayload, setModalPayload] = useState<T | undefined>(undefined);
  console.log("showModal", showModal);
  console.log("modalPayload", modalPayload);

  const value = useMemo(
    () => ({
      showModal,
      setShowModal,
      modalPayload,
      setModalPayload,
    }),
    [showModal, modalPayload]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = <T = any,>() => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context as ModalContextProps<T>;
};
