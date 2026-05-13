"use client";

import { Camera } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUpload, FileUploadTrigger } from "@/components/ui/file-upload";

export const title = "Avatar Upload";

interface FileAvatarProps {
  value: File[];
  onValueChange: (files: File[]) => void;
  currentImage?: string;
  className?: string;
}

const FileAvatar = ({ value, onValueChange, currentImage, className }: FileAvatarProps) => {
  const avatarPreview =
    value.length > 0
      ? URL.createObjectURL(value[0])
      : currentImage || "https://github.com/shadcn.png";

  return (
    <div className={`flex flex-col items-center gap-4 ${className || ""}`}>
      <FileUpload
        value={value}
        onValueChange={onValueChange}
        accept="image/*"
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
      >
        <FileUploadTrigger asChild>
          <button className="group relative cursor-pointer rounded-full">
            <Avatar className="size-24">
              <AvatarImage src={avatarPreview} alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="size-6 text-white" />
            </div>
          </button>
        </FileUploadTrigger>
      </FileUpload>
      <p className="text-sm text-muted-foreground">Click to change avatar</p>
    </div>
  );
};

export default FileAvatar;
