import React from "react";
import Image from "next/image";

interface TowerLogoProps {
  subtitle?: string;
  className?: string;
}

export default function TowerLogo({ subtitle = "DOCS", className = "" }: TowerLogoProps) {
  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <Image
          src="/assets/towerlogo.svg"
          alt="TOWER"
          width={110}
          height={30}
          className="h-5 sm:h-5.5 w-auto shrink-0 block"
          priority
        />
        {subtitle && (
          <>
            <span className="h-4 sm:h-4.5 w-px bg-slate-200 shrink-0 self-center" aria-hidden="true" />
            <span className="text-[9.5px] sm:text-xs font-bold tracking-widest text-slate-700 uppercase leading-none shrink-0 self-center pt-0.5">
              {subtitle}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
