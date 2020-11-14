export interface CovidTestingCentre {
  covid_testing_centre_id: number,
  building_number: string,
  street_number: string,
  postal_code: string,
  name: string,
  city: string,
  province: string
}

export function formatAddress(covidTestingCentre: CovidTestingCentre): string {
  const postalAddress: string = `${covidTestingCentre.city} ${covidTestingCentre.province} ${covidTestingCentre.postal_code}`;
  return `${covidTestingCentre.building_number} ${covidTestingCentre.street_number}\n${postalAddress}`
}