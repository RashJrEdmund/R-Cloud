"use client";

import { TextTag, DivCard } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/providers/stores/zustand";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import StyledProfileImage from "./styled-profile-image";
import Image from "next/image";
import { updateProfileImage } from "@/core/config/firebase";
import type { User } from "@/core/interfaces/entities";
import { toast } from "sonner";
import { cn } from "@/core/lib/utils";

interface Props {
  //
}

export default function ProfileImage({}: Props) {
  const { currentUser, setCurrentUser } = useUserStore();

  const [profileUrl, setProfileUrl] = useState<string>(
    currentUser?.photo_url ? currentUser?.photo_url : "/user_profile_icon.svg"
  );

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files?.length <= 0) return;

    const file = e.target?.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setPreview(null);
    setFile(null);
    setProfileUrl(currentUser?.photo_url || "/user_profile_icon.svg");
  };

  const handleFileUpload: MouseEventHandler<HTMLButtonElement> = () => {
    if (!file || !currentUser) return;
    setLoading(true);

    updateProfileImage(file, currentUser.email)
      .then((url) => {
        currentUser.photo_url = url;
        const user: { [key: string]: any } = { ...(currentUser || {}) };
        user.photo_url = url;

        setProfileUrl(url);

        setCurrentUser(user as User);
        toast.info("Profile photo updated", {
          description: "Successfully updated profile photo",
        });
      })
      .finally(() => {
        setPreview(null);
        setFile(null);
        setLoading(false);
      });
  };

  return (
    <StyledProfileImage>
      <DivCard className="w-full flex-col gap-[10px] border border-app_border pb-[10px]">
        <Image
          src={preview || profileUrl}
          alt={`image of ${currentUser?.username}`}
          draggable={false}
          width={250}
          height={250}
          className="max-h-[300px] min-w-[300px] object-cover"
        />

        <TextTag className="relative cursor-pointer whitespace-nowrap">
          <label htmlFor="image-upload-field" className="image-upload-label">
            <input
              value="" // to not allow the name of the file from block the immediate selection of the same prev file.
              id="image-upload-field"
              className="image-upload-field"
              type="file"
              placeholder="upload profile image"
              accept="image/png, image/gif, image/jpeg, image/svg"
              onChange={handleFileInput}
            />
          </label>
          <Image
            src="/icons/modal-icons/upload-icon.svg"
            alt={`image of ${currentUser?.username}`}
            width={17}
            height={17}
            draggable={false}
          />
          Change image
        </TextTag>
      </DivCard>

      {preview ? (
        <DivCard className="gap-[10px]">
          <Button
            variant="blued"
            className={cn(
              "m-[5px_0_0] w-full",
              loading ? "cursor-not-allowed" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleFileUpload}
          >
            {loading ? "uploading..." : "done"}
          </Button>

          <Button
            variant="error"
            className="m-[5px_0_0]"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </DivCard>
      ) : null}
    </StyledProfileImage>
  );
}
