import React from "react";
import { debounce } from 'throttle-debounce';
import {TextField} from "@material-ui/core";

interface DebouncedInputProps {
  onDebounce: (searchTerm: string) => any,
  placeholder: string,
  debounceTime?: number,
  label: string
}

export default function DebouncedInput({
    onDebounce,
    placeholder,
    debounceTime = 300,
    label = ""}: DebouncedInputProps) {
  const onInputValueChange = debounce(debounceTime, (event) => {
    onDebounce(event.target.value);
  });

  return (
    <TextField
      placeholder={placeholder}
      label={label}
      onChange={onInputValueChange}
      variant = "outlined"/>
  )
}