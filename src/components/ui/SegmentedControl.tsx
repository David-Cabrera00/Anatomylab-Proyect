import { Button } from "./Button";

export type SegmentedOption<Value extends string> = Readonly<{
  value: Value;
  label: string;
  disabled?: boolean;
}>;

type SegmentedControlProps<Value extends string> = {
  label: string;
  options: readonly SegmentedOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  className?: string;
};

/** Grupo de botones con selección única; Tab y Enter/Espacio son nativos. */
export function SegmentedControl<Value extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: SegmentedControlProps<Value>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex w-max items-center gap-1 rounded-ds-md bg-canvas-muted/70 p-1 ${className}`}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          selected={value === option.value}
          aria-pressed={value === option.value}
          disabled={option.disabled}
          onClick={() => onChange(option.value)}
          className="whitespace-nowrap"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
