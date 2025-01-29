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
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

interface ModalPayload {
  image: string;
}

const ViewImageModal = () => {
  const { showModal, setShowModal, modalPayload } = useModal<ModalPayload>();
  return (
    <ModalLayout
      isOpen={showModal === "view-image"}
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
        {/* <ModalHeader></ModalHeader> */}

        <ModalBody className="flex flex-col gap-3">
          {modalPayload?.image ? (
            <Image
              src={modalPayload?.image}
              alt=""
              layout="responsive"
              width={300}
              height={300}
              className="rounded-lg w-full"
            />
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </ModalLayout>
  );
};

export default ViewImageModal;
