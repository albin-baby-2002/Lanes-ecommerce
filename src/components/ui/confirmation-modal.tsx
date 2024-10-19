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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

//----------------------------------------------------------------------------

interface TProps {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
}

//----------------------------------------------------------------------------

const ConfirmationModal: React.FC<TProps> = ({
  open,
  onClose,
  title,
  description,
  primaryAction,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {secondaryActionLabel && secondaryAction && (
            <AlertDialogCancel onClick={secondaryAction}>
              {secondaryActionLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={primaryAction}>
            {primaryActionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
