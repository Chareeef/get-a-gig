import Image from "next/image";

export default function ProfileImage({
  imageURL,
  userName,
}: {
  imageURL: string;
  userName: string;
}) {
  if (!imageURL) {
    const initials = userName
      .split(" ")
      .map((word) => word[0])
      .join(".");

    return (
      <div className="flex-center size-32 rounded-full border-2 border-yellow-500 bg-slate-100 text-4xl text-yellow-500">
        {initials}
      </div>
    );
  }

  return (
    <Image
      className="rounded-full"
      src={imageURL}
      alt={userName}
      width={128}
      height={128}
    />
  );
}
