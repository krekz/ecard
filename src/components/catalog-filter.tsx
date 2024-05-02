"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useRouter, useSearchParams,usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CatalogFilterProps = {
  checkboxList: { id: string; label: string }[];
};

// This component you will notice i'm using 'useSearchParams' from next/navigation AND 'URLSearchParams' from the DOM (no need to import)
// The reason is because the 'useSearchParams' from next/navigation only allow "READONLY" (refer to documentation nextjs)
// To edit the url params (eg. add/delete), it required to use URLSearchParams bcoz it is the only way to alter the params (idk if there's any library, then tell me if exist :)) )

const CatalogFilter: React.FC<CatalogFilterProps> = ({ checkboxList }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getFilterParams = searchParams.getAll("filter");
  const getSortParams = searchParams.get("sortBy");
  const router = useRouter();

  // NOTE: FILTER params can have multiple value (e.g "?filter=Hello&filter=Sheesh&filter=Nextjs")
  const handleOnCheck = (listID: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search); // declare var URLSearchParams to (append, delete) url params.

    // check params or query "?filter=blabla" existed
    const isParamsExisted = getFilterParams.includes(listID);
    if (isParamsExisted) {
      const newFilter = urlSearchParams
        .getAll("filter")
        .filter((paramsValue) => paramsValue !== listID);
      urlSearchParams.delete("filter"); // clear all the existed params/query 'filter'
      newFilter.forEach((id) => urlSearchParams.append("filter", id)); 
    } else {
      urlSearchParams.append("filter", listID);
    }

    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  const handleOnChangeSelect = (value: any) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("sortBy", value);
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  return (
    <>
      {/* SortBy (Select) */}
      <Select onValueChange={handleOnChangeSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={
              getSortParams
                ?.charAt(0)
                .toUpperCase()
                .concat(getSortParams?.slice(1)) || "Sort By"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="popular">Popular</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
        </SelectContent>
      </Select>
      <h1 className="text-2xl font-medium mt-5">Filter</h1>

      <div className="mt-3 flex flex-col gap-2">
        {checkboxList.map((list) => (
          <div key={list.id} className="flex gap-2">
            <Checkbox
              id={list.id}
              onCheckedChange={() => handleOnCheck(list.id)}
              checked={getFilterParams.includes(list.id)}
            />
            <label
              htmlFor={list.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {list.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatalogFilter;
