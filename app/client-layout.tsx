"use client";
import DonateModal from "@/components/pages/campaign/donate-modal";
import ViewImageModal from "@/components/pages/campaign/view-image-modal";
import { useModal } from "@/contexts/ModalContextProvider";
// import { ThirdwebProvider } from "@thirdweb-dev/react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { showModal } = useModal();
  return (
    <>
      {showModal === "view-image" && <ViewImageModal />}
      {showModal === "donate" && <DonateModal />}
      <div>
        {/* <ThirdwebProvider>{children}</ThirdwebProvider> */}
        {children}
      </div>
    </>
  );
};

export default ClientLayout;
