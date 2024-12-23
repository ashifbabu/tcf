"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
/** 
 * If you want strict TS types, define a TripType union 
 * matching your possible trip types.
 */
export type TripType = "One Way" | "Round Trip" | "Multi City";

interface TripTypesProps {
  selectedType: TripType;
  onSelect: (type: TripType) => void;
}

/**
 * TripTypes component
 * 
 * Renders a vertical stack of radios using shadcn/ui's RadioGroup.
 */
export function TripTypes({ selectedType, onSelect }: TripTypesProps) {
  return (
    <RadioGroup
      /** 
       * "value" = the currently selected trip type.
       * "onValueChange" = pass the new value back up.
       */
      value={selectedType}
      onValueChange={(val) => onSelect(val as TripType)}
      /** 
       * This class places each radio item on its own row, 
       * so the entire group is vertical. 
       */
      className="flex items-center space-x-4"
    >
      {/* One Way */}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="One Way" id="one-way" />
        <Label htmlFor="one-way">One Way</Label>
      </div>

      {/* Round Trip */}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Round Trip" id="round-trip" />
        <Label htmlFor="round-trip">Round Trip</Label>
      </div>

      {/* Multi City */}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Multi City" id="multi-city" />
        <Label htmlFor="multi-city">Multi City</Label>
      </div>
    </RadioGroup>
  );
}

export default TripTypes;