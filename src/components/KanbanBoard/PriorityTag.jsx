import React from "react";

const dotColorVariants = {
  High: "bg-[#FF4848]",
  Medium: "bg-[#FF8B48]",
  Low: "bg-[#15DD4D]",
};

const textColorVariants = {
  High: "text-[#FF4848]",
  Medium: "text-[#FF8B48]",
  Low: "text-[#15DD4D]",
};

const bgColorVariants = {
  High: "bg-[#E32121]/20",
  Medium: "bg-[#FF8B48]/20",
  Low: "bg-[#15DD4D]/20",
};

export default function PriorityTag({ priority }) {
  return (
    <div
      className={`w-fit px-[6px] py-[2px] h-[22px] ${bgColorVariants[priority]} flex items-center gap-[4px] justify-center rounded-[16px]`}
    >
      <div
        className={`w-[8px] h-[8px] rounded-full ${dotColorVariants[priority]}`}
      ></div>
      <p className={`text-xs font-medium ${textColorVariants[priority]}`}>
        {priority}
      </p>
    </div>
  );
}
