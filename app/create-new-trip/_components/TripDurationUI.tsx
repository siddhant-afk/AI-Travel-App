import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type TripDurationProps = {
  onSelectOption: (value: string) => void; // same pattern as your other components
};

export default function TripDuration({ onSelectedOption }: any) {
  const [days, setDays] = useState(3);

  const increaseDays = () => setDays(prev => prev + 1);
  const decreaseDays = () => setDays(prev => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="flex flex-col items-center p-6 border rounded-xl bg-white  w-full">
      <h2 className="text-lg font-semibold mb-4">
        How many days do you want to travel?
      </h2>

      <div className="flex items-center gap-6 mb-4">
        <button
          onClick={decreaseDays}
          className="p-3 rounded-full border bg-gray-100 hover:bg-gray-200"
        >
          <Minus />
        </button>

        <span className="text-xl font-bold">{days} Days</span>

        <button
          onClick={increaseDays}
          className="p-3 rounded-full border bg-gray-100 hover:bg-gray-200"
        >
          <Plus />
        </button>
      </div>

      <Button
        onClick={() => onSelectedOption(`${days} Days`)}
        className="bg-primary  text-white px-6 py-2 rounded-lg"
      >
        Confirm
      </Button>
    </div>
  );
}
