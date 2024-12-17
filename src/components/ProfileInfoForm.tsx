"use client";
import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";

// async function handleFormAction(formData: FormData) {
//       await saveProfile(formData);
//       toast.success('Profile saved!');
//     }

//     return (
//       <form action={handleFormAction}>
// the above lines are different below as they were changed by me to prevent auto refreshing of the page

type Props = { profileInfo: ProfileInfo | null };

export default function ProfileInfoForm({ profileInfo }: Props) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

  async function handleFormAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await saveProfile(formData);
    toast.success("Profile saved!");
  }

  return (
    <form onSubmit={handleFormAction}>
      <div className=" relative border bg-gray-100 rounded-lg h-48 mb-8">
        <Image
          src={coverUrl || ""}
          alt="coverImage"
          width={1024}
          height={1024}
          className="w-full h-48 object-cover object-center rounded-lg"
        />

        <div className=" absolute left-4 -bottom-4 z-10 border bg-gray-100 size-24 rounded-lg">
          <div className="rounded-lg size-24 overflow-hidden">
            <Image
              src={avatarUrl || ""}
              alt="avatar"
              width={120}
              height={120}
            />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl} />
          </div>

          <input type="hidden" name="avatarUrl" value={avatarUrl} />
        </div>
        <div className="absolute right-2 bottom-2">
          <UploadButton onUploadComplete={setCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="input-label" htmlFor="usernameIn">
            username
          </label>
          <input
            defaultValue={profileInfo?.username}
            name="username"
            id="usernameIn"
            type="text"
            placeholder="username"
          />
        </div>
        <div>
          <label className="input-label" htmlFor="displayNameIn">
            display name
          </label>
          <input
            defaultValue={profileInfo?.displayName}
            name="displayName"
            id="displayNameIn"
            type="text"
            placeholder="display name"
          />
        </div>
      </div>
      <div>
        <label className="input-label" htmlFor="bioIn">
          bio
        </label>
        <textarea
          defaultValue={profileInfo?.bio}
          id="bioIn"
          name="bio"
          placeholder="bio"
        ></textarea>
      </div>
      <div>
        <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg">
          Save profile
        </button>
      </div>
    </form>
  );
}
