export default class ColumnType {
  private name: string;
  private type: "string" | "boolean" | "dateTime" | "date" | "number";
  private nullable: boolean;

  constructor(
    name: string,
    type: "string" | "boolean" | "dateTime" | "date" | "number",
    nullable: boolean
  ) {
    this.name = name;
    this.type = type;
    this.nullable = nullable;
  }

  getName(): string {
    return this.name;
  }
  getType(): "string" | "boolean" | "dateTime" | "date" | "number" {
    return this.type;
  }
  getNullable(): boolean {
    return this.nullable;
  }
}
