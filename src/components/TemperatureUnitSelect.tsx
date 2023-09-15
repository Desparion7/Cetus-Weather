import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { TemperatureUnit } from "@/App.tsx";

const temperatureUnitOptions: { value: TemperatureUnit; label: string }[] = [
  {
    value: "CELSIUS",
    label: "Celsius",
  },
  {
    value: "FAHRENHEIT",
    label: "Fahrenheit",
  },
];

type TemperatureUnitSelectProps = {
  value: TemperatureUnit;
  onChange: (val: TemperatureUnit) => void;
};

export const TemperatureUnitSelect = ({
  value,
  onChange,
}: TemperatureUnitSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        {temperatureUnitOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
