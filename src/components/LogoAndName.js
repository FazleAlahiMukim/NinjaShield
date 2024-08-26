import React from "react";
import Image from "next/image";

export default function LogoAndName({ size = "large" }) {
  return (
    <div className="flex flex-row items-center">
      <Image
        src="/images/ninjashield.png"
        alt="Ninja Shield Logo"
        width={size == "large" ? 100 : size == "small" ? 50 : 75}
        height={size == "large" ? 60 : size == "small" ? 30 : 45}
        style={{ width: 'auto', height: 'auto' }}
        priority
      />
      <Image
        className={size == "large" ? "ml-6" : size == "small" ? "ml-2" : "ml-1"}
        src="/images/text.png"
        alt="Ninja Shield"
        width={size == "large" ? 350 : size == "small" ? 120 : 250}
        height={size == "large" ? 20 : size == "small" ? 10 : 15}
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
}
