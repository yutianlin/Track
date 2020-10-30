export class ExpectedValueTypes {
  private notNullableStrings: string[] = [];
  private nullableStrings: string[] = [];
  private notNullableBooleans: string[] = [];
  private nullableBooleans: string[] = [];
  private notNullableDateTimes: string[] = [];
  private nullableDateTimes: string[] = [];
  private notNullableNumbers: string[] = [];
  private nullableNumbers: string[] = [];

  setNotNullableStrings(strings: string[]) {
    this.notNullableStrings = strings;
  }
  setNullableStrings(strings: string[]) {
    this.nullableStrings = strings;
  }
  setNotNullableBooleans(booleans: string[]) {
    this.notNullableBooleans = booleans;
  }
  setNullableBooleans(booleans: string[]) {
    this.nullableBooleans = booleans;
  }
  setNotNullableDateTimes(dateTime: string[]) {
    this.notNullableDateTimes = dateTime;
  }
  setNullableDateTimes(dateTime: string[]) {
    this.nullableDateTimes = dateTime;
  }
  setNotNullableNumbers(numbers: string[]) {
    this.notNullableNumbers = numbers;
  }
  setNullableNumbers(numbers: string[]) {
    this.nullableNumbers = numbers;
  }

  getNotNullableStrings() {
    return this.notNullableStrings;
  }
  getNullableStrings() {
    return this.nullableStrings;
  }
  getNotNullableBooleans() {
    return this.notNullableBooleans;
  }
  getNullableBooleans() {
    return this.nullableBooleans;
  }
  getNotNullableDateTimes() {
    return this.notNullableDateTimes;
  }
  getNullableDateTimes() {
    return this.nullableDateTimes;
  }
  getNotNullableNumbers() {
    return this.notNullableNumbers;
  }
  getNullableNumbers() {
    return this.nullableNumbers;
  }
}
