"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

//----------------------------------------------------------------------------

interface TProps {
  open: boolean;
  title: string;
  description: string | React.ReactNode;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
  color?: "error" | "success";
  primaryActionPending?: boolean;
}

//----------------------------------------------------------------------------

const ConfirmationModal: React.FC<TProps> = ({
  open,
  title,
  description,
  primaryAction,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
  color,
  primaryActionPending,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          {secondaryActionLabel && secondaryAction && (
            <AlertDialogCancel onClick={secondaryAction}>
              {secondaryActionLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            className={cn({
              "bg-red-600": color === "error",
            })}
            onClick={primaryAction}
          >
            {primaryActionPending && (
              <Image
                height={24}
                width={24}
                className="mr-2"
                alt="svg"
                src={"/loaders/circular-loader.svg"}
              />
            )}
            {primaryActionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
