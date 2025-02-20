"use client";
import { Button } from "@/components/ui/button";
import { DataDisplayingInput } from "@/sections/checkout/existing-addresses";
import React, { useState } from "react";
import UpdateAddressModal from "../update-address-modal";

interface TAddress {
  fullName: string;
  addressLine: string;
  city: string;
  district: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  addressId: string;
}

const filedsNotTOShow = ["addressId", "userId", "createdAt", "updatedAt"];

const UpdateAddressView = ({ addresses }: { addresses: TAddress[] }) => {
  const [openUpdateAddressModal, setOpenAddressModal] = useState(false);

  const [addressToEditId, setAddressToEditId] = useState("");

  return (
    <div className="lg:w-[60%] p-8 font-medium">
      {addresses.map((address: TAddress, addressIndex: number) => (
        <div key={addressIndex} className="mb-8">
          <p className="pb-8 text-lg font-bold">Address {addressIndex + 1}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(address)
              .filter((key) => !filedsNotTOShow.includes(key))
              .map((key) => (
                <DataDisplayingInput
                  key={key}
                  value={address[key as keyof typeof address].toString()}
                  label={key.split("_").join(" ")}
                />
              ))}{" "}
          </div>

          <Button
            onClick={() => {
              setAddressToEditId(address.addressId);
              setOpenAddressModal(true);
            }}
            className="mt-8"
          >
            Edit Address
          </Button>
        </div>
      ))}
      <UpdateAddressModal
        open={openUpdateAddressModal}
        toggleClose={() => {
          setOpenAddressModal(false);
        }}
        addressToEdit={addresses.find(
          (address) => address.addressId === addressToEditId,
        )}
      />
    </div>
  );
};

export default UpdateAddressView;
