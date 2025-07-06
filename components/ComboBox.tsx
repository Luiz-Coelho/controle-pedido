import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../styles/theme";

type Option = {
  label: string;
  value: number;
};

type Props = {
  options: Option[];
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
};

export function ComboBox({ options, value, onChange, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Option[]>([]);
  const [internalValue, setInternalValue] = useState<number | null>(
    value ?? null
  );

  useEffect(() => {
    setItems(options);
  }, [options]);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={internalValue}
      items={items}
      setOpen={setOpen}
      setValue={(cb) => {
        const newVal = cb(internalValue);
        onChange(newVal ?? undefined);
        setInternalValue(newVal ?? null);
      }}
      setItems={setItems}
      placeholder={placeholder || "Selecione..."}
      listMode="SCROLLVIEW"
      zIndex={1000}
      zIndexInverse={3000}
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.surface,
        borderWidth: 1,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginBottom: theme.spacing.lg,
      }}
      textStyle={{
        color: theme.colors.text,
        fontSize: 16,
      }}
      dropDownContainerStyle={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.surface,
      }}
      placeholderStyle={{
        color: theme.colors.placeholder,
      }}
    />
  );
}
