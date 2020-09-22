export interface Region {
  id: number;
  code: string;
  name: string;
  postCode: string;
  shipCode?: string;
  countryCode: string;
}

export interface District {
  regionId: number;
  id: number;
  code: string;
  name: string;
}

export interface Ward {
  districtId: number;
  id: number;
  code: string;
  name: string;
}
