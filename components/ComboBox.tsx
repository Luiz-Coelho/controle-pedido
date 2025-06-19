import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Pressable,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";

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
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const selected = options.find((opt) => opt.value === value);
    if (selected) {
      setQuery(selected.label);
    } else {
      setQuery("");
    }
  }, [value, options]);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (val: number, label: string) => {
    setQuery(label);
    setShowDropdown(false);
    Keyboard.dismiss();
    onChange(val);
  };

  const handleClear = () => {
    setQuery("");
    onChange(undefined);
  };

  return (
    <View className="relative z-10">
      <View className="flex-row items-center bg-gray-800 rounded px-3 py-2 border border-gray-600">
        <Feather name="search" size={16} color="#ccc" className="mr-2" />
        <TextInput
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder || "Selecione..."}
          placeholderTextColor="#aaa"
          className="flex-1 text-white"
        />
        {query.length > 0 && (
          <Pressable onPress={handleClear} className="ml-2">
            <Feather name="x" size={16} color="#ccc" />
          </Pressable>
        )}
      </View>

      {showDropdown && filtered.length > 0 && (
        <View className="absolute top-14 left-0 right-0 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-48">
          <FlatList
            data={filtered}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item.value, item.label)}
                className="px-4 py-2 border-b border-gray-800 hover:bg-gray-700"
              >
                <Text className="text-white">{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
