import React from "react";
import { debounce } from 'throttle-debounce';
import {TextField} from "@material-ui/core";

interface DebouncedInputProps {
  onDebounce: (searchTerm: string) => any,
  placeholder: string,
  debounceTime?: number,
  fullWidth?: boolean
}

export default function DebouncedInput({onDebounce, placeholder, debounceTime = 300, fullWidth = true}: DebouncedInputProps) {
  const onInputValueChange = debounce(debounceTime, (event) => {
    onDebounce(event.target.value);
  });

  return (
    <TextField
      placeholder={placeholder}
      fullWidth={!fullWidth}
      onChange={onInputValueChange}
      variant = "outlined"/>
  )
}