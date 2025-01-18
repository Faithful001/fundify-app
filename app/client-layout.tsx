"use client";
import ViewImageModal from "@/components/pages/campaign/view-image-modal";
import { useModal } from "@/contexts/ModalContextProvider";
// import { ThirdwebProvider } from "@thirdweb-dev/react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { showModal } = useModal();
  return (
    <>
      {showModal === "view-image" && <ViewImageModal />}
      <div>
        {/* <ThirdwebProvider>{children}</ThirdwebProvider> */}
        {children}
      </div>
    </>
  );
};

export default ClientLayout;
