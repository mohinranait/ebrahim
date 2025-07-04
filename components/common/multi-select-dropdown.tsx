"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type MultiSelectDropdownValues = {
  value: string;
  label: string;
};

type PropTypes = {
  frameworks: MultiSelectDropdownValues[];
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  label?: string;
};

export default function MultiSelectDropdown({
  frameworks,
  selectedValues,
  setSelectedValues,
  label,
}: PropTypes) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    setSelectedValues((prev) =>
      prev.includes(currentValue)
        ? prev.filter((value) => value !== currentValue)
        : [...prev, currentValue]
    );
  };

  const handleRemove = (valueToRemove: string) => {
    setSelectedValues((prev) =>
      prev.filter((value) => value !== valueToRemove)
    );
  };

  const selectedLabels = selectedValues
    ?.map(
      (value) =>
        frameworks.find((framework) => framework.value === value)?.label
    )
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray">{label}</label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-auto min-h-10 bg-transparent hover:bg-transparent"
            >
              <div className="flex flex-wrap gap-1">
                {selectedValues?.length === 0 ? (
                  <span className="text-gray">
                    {label ? label : "Select..."}
                  </span>
                ) : (
                  selectedLabels?.map((label) => (
                    <Badge
                      key={label}
                      variant="secondary"
                      className="mr-1 mb-1"
                    >
                      {label}
                      <button
                        className="ml-1 ring-offset-background text-gray rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const value = frameworks.find(
                              (f) => f.label === label
                            )?.value;
                            if (value) {
                              handleRemove(value);
                            }
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const value = frameworks.find(
                            (f) => f.label === label
                          )?.value;
                          if (value) {
                            handleRemove(value);
                          }
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No data found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      className="text-gray justify-between cursor-pointer"
                      key={framework.value}
                      value={framework.value}
                      onSelect={() => handleSelect(framework.value)}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          " h-4 w-4",
                          selectedValues.includes(framework.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
