import Cookies from "js-cookie";

export class CookieService {
  private static IDENTITY_COOKIE_KEY = "me";

  public static getPersonId(): string | undefined {
    return Cookies.get(CookieService.IDENTITY_COOKIE_KEY);
  }

  public static setPersonId(personId: number): void {
    Cookies.set(
      CookieService.IDENTITY_COOKIE_KEY,
      personId.toString(),
      {
        expires: new Date('2025-12-17T03:24:00')
      });
  }
}
