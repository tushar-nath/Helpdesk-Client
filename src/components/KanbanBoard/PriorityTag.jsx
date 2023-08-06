import React from "react";

const dotColorVariants = {
  Grievance: "bg-[#FF4848]",
  Reimbursement: "bg-[#FF8B48]",
  "Asset Allocation": "bg-[#15DD4D]",
  "Client Request": "bg-[#FFCE00]",
  Onboarding: "bg-[#00BFFF]",
  "Change Request": "bg-[#FFD700]",
  Marketing: "bg-[#FF5733]",
};

const textColorVariants = {
  Grievance: "text-[#FF4848]",
  Reimbursement: "text-[#FF8B48]",
  "Asset Allocation": "text-[#15DD4D]",
  "Client Request": "text-[#FFCE00]",
  Onboarding: "text-[#00BFFF]",
  "Change Request": "text-[#FFD700]",
  Marketing: "text-[#FF5733]",
};

const bgColorVariants = {
  Grievance: "bg-[#E32121]/20",
  Reimbursement: "bg-[#FF8B48]/20",
  "Asset Allocation": "bg-[#15DD4D]/20",
  "Client Request": "bg-[#FFCE00]/20",
  Onboarding: "bg-[#00BFFF]/20",
  "Change Request": "bg-[#FFD700]/20",
  Marketing: "bg-[#FF5733]/20",
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
