"use client";
import {
  Modal as ModalLayout,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import Button from "@/components/ui/buttons";
import Input from "@/components/ui/inputs";
import { useModal } from "@/contexts/ModalContextProvider";
import { Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiDonateHeart } from "react-icons/bi";
import { useBlockchain } from "@/contexts/BlockchainContext";

interface ModalPayload {
  id: string;
  //   target: number
}

const DonateModal = () => {
  const { showModal, setShowModal, modalPayload } = useModal<ModalPayload>();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { donateToCampaign } = useBlockchain();

  async function handleDonate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const id = modalPayload?.id;
      const response = id && (await donateToCampaign(id, amount));
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <ModalLayout
      isOpen={showModal === "donate"}
      onClose={() => setShowModal("")}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent
        textColor={"black"}
        borderRadius={"16px"}
        marginX={"16px"}
        maxWidth={"743px"}
        width={"85%"}
        padding={"20px"}
        paddingTop={"24px"}
        backgroundColor={"white"}
      >
        <ModalCloseButton
          color={"#151515"}
          border={"transparent"}
          //   marginTop={"20px"}
          //   marginRight={"20px"}
        />
        <ModalHeader>Fund the campaign</ModalHeader>
        <form onSubmit={handleDonate}>
          <ModalBody className="flex flex-col gap-3">
            <span className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm">
                Amount
              </label>
              <Input
                type="number"
                placeholder="ETH 0.1"
                // step="0.01"
                bgColor="#ffffff"
                outlineStyle="solid"
                outlineWidth="1px"
                outlineColor="#4b5264"
                className="w-full placeholder:text-[#4b5264]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </span>
          </ModalBody>
          <ModalFooter className="w-full flex items-start">
            {" "}
            <Button type="submit" className="sm:w-max w-full">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  Donate <BiDonateHeart />
                </>
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalLayout>
  );
};

export default DonateModal;
