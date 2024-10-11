// src/components/CustomInput.tsx
import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomInputProps {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  isPhoneInput?: boolean; // Adicionado para diferenciar quando é um campo de telefone
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  isPhoneInput = false,
}) => {
  return (
    <div>
      {isPhoneInput ? (
        <PhoneInput
          name={name}
          value={value}
          onChange={onChange as (value: string | undefined) => void} // Cast necessário para o tipo de telefone
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded"
        />
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default CustomInput;
