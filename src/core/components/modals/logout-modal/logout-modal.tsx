"use client";

import { useState } from "react";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logOut } from "@/core/config/firebase";
import { useRouter } from "next/navigation";

interface Props {
  //
}

export default function LogoutModal({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    logOutDialogOpen,
    setLogOutDialogOpen,
    setCurrentUser,
    setUserProfile,
  } = useUserStore();

  const { setDocuments } = useDocStore();

  const router = useRouter();

  const closeModal = () => {
    setLogOutDialogOpen(false);
    setIsLoading(false);
  };

  const handleLogOut = async () => {
    //oseModal();
    try {
      await logOut();

      // setCurrentUser(null);
      // setUserProfile(null);
      // setDocuments([]);

      toast("Logout successful !", {
        description: "You'll have to login to use some parts of the app!",
      });

      (async () => {
        router.replace("/");
      })().then(() => {
        setCurrentUser(null);
        setUserProfile(null);
        setDocuments([]);
      });
    } catch (error) {
      //
    } finally {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isLoading ? true : logOutDialogOpen}
      onOpenChange={setLogOutDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">
            You are about to be logged out
          </DialogTitle>

          <DialogDescription>
            Logging out will clear your current session and take your out of the
            app. are you sure?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex w-full items-center justify-end">
          <DialogClose asChild disabled={isLoading} className="outline-none">
            <Button className="w-fit outline-none" variant="error">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="blued"
            disabled={isLoading}
            onClick={handleLogOut}
            className="w-fit min-w-[100px]"
          >
            {isLoading ? "hold on" : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
