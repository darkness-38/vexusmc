import Image from "next/image";

interface AvatarProps {
  username: string;
  size?: number;
  body?: boolean;
}

export function Avatar({ username, size = 48, body = false }: AvatarProps) {
  const src = body
    ? `https://minotar.net/body/${username}/${size}`
    : `https://minotar.net/avatar/${username}/${size}`;

  return (
    <Image
      src={src}
      alt={`${username} avatar`}
      width={size}
      height={size}
      className="rounded-lg border border-[var(--border)]"
    />
  );
}

