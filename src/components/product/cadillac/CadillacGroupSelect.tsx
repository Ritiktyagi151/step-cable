"use client";

import { FaChevronDown } from "react-icons/fa6";

type CadillacGroupSelectProps = {
  groups: {
    category: string;
    count: number;
    id: string;
  }[];
};

export function CadillacGroupSelect({ groups }: CadillacGroupSelectProps) {
  return (
    <div className="mt-8 max-w-md">
      <label htmlFor="cadillac-group-select" className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-slate-600">
        Select Product Group
      </label>
      <div className="relative">
        <select
          id="cadillac-group-select"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) {
              window.location.hash = event.target.value;
            }
          }}
          className="h-12 w-full appearance-none rounded-[8px] border border-slate-200 bg-white px-4 pr-11 text-sm font-black text-slate-900 shadow-sm outline-none transition hover:border-[#2486FE]/40 focus:border-[#2486FE] focus:ring-4 focus:ring-[#2486FE]/10"
        >
          <option value="" disabled>
            Choose a group
          </option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.category} ({group.count})
            </option>
          ))}
        </select>
        <FaChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
      </div>
    </div>
  );
}
