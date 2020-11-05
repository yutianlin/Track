export default class ColumnType {
  private name: string;
  private type: "string" | "boolean" | "dateTime" | "number"; // might want only date later
  private nullable: boolean;

  constructor(
    name: string,
    type: "string" | "boolean" | "dateTime" | "number",
    nullable: boolean
  ) {
    this.name = name;
    this.type = type;
    this.nullable = nullable;
  }

  getName(): string {
    return this.name;
  }
  getType(): "string" | "boolean" | "dateTime" | "number" {
    return this.type;
  }
  getNullable(): boolean {
    return this.nullable;
  }
}
