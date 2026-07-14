import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Kyros Tech - página inicial">
      <Image
        src="/brand/kyros-logo-horizontal.png"
        alt="Kyros Tech"
        width={533}
        height={138}
        priority
        className="h-10 w-auto object-contain sm:h-12"
      />
    </Link>
  );
}
