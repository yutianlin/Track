import ColumnType from "./ColumnType";
import { InvalidTypesError } from "../errors";

export class ExpectedValueTypes {
  private nullable: Map<string, Array<string>> = new Map([
    ["strings", []],
    ["booleans", []],
    ["dateTimes", []],
    ["dates", []],
    ["numbers", []],
  ]);

  private notNullable: Map<string, Array<string>> = new Map([
    ["strings", []],
    ["booleans", []],
    ["dateTimes", []],
    ["dates", []],
    ["numbers", []],
  ]);

  constructor(columns: ColumnType[], allNullable: boolean = false) {
    columns.forEach((column) => {
      if (allNullable || column.getNullable()) {
        this.nullable.get(`${column.getType()}s`)?.push(column.getName());
      } else {
        this.notNullable.get(`${column.getType()}s`)?.push(column.getName());
      }
    });
  }

  getNotNullableStrings(): Array<string> {
    const strings = this.notNullable.get("strings");
    if (!strings) {
      throw new InvalidTypesError("strings not nullable");
    }
    return strings;
  }

  getNullableStrings(): Array<string> {
    const strings = this.nullable.get("strings");
    if (!strings) {
      throw new InvalidTypesError("strings nullable");
    }
    return strings;
  }

  getNotNullableBooleans(): Array<string> {
    const booleans = this.notNullable.get("booleans");
    if (!booleans) {
      throw new InvalidTypesError("booleans not nullable");
    }
    return booleans;
  }

  getNullableBooleans() {
    const booleans = this.nullable.get("booleans");
    if (!booleans) {
      throw new InvalidTypesError("booleans nullable");
    }
    return booleans;
  }

  getNotNullableDateTimes() {
    const dateTimes = this.notNullable.get("dateTimes");
    if (!dateTimes) {
      throw new InvalidTypesError("dateTimes not nullable");
    }
    return dateTimes;
  }

  getNullableDateTimes() {
    const dateTimes = this.nullable.get("dateTimes");
    if (!dateTimes) {
      throw new InvalidTypesError("dateTimes nullable");
    }
    return dateTimes;
  }

  getNotNullableDates() {
    const dates = this.notNullable.get("dates");
    if (!dates) {
      throw new InvalidTypesError("dates not nullable");
    }
    return dates;
  }

  getNullableDates() {
    const dates = this.nullable.get("dates");
    if (!dates) {
      throw new InvalidTypesError("dates nullable");
    }
    return dates;
  }

  getNotNullableNumbers() {
    const numbers = this.notNullable.get("numbers");
    if (!numbers) {
      throw new InvalidTypesError("numbers not nullable");
    }
    return numbers;
  }

  getNullableNumbers() {
    const numbers = this.nullable.get("numbers");
    if (!numbers) {
      throw new InvalidTypesError("numbers nullable");
    }
    return numbers;
  }
}
