export type ServiceProductType = {
  description: string,
  distance: number,
  id: number,
  image: null,
  name: string
  price: number,
  organization: {
    address: string,
    id: number,
    image: string,
    latitude: number,
    longitude: number,
    name: string,
    phone: string
  }
}

export type OrganizationType = {
  address: string,
  description: string,
  distance_km: number,
  id: number,
  image: string,
  latitude: number,
  longitude: number,
  name: string,
  phone: string
}

export type OrganizationPointsType = {
  type: "FeatureCollection",
  features: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: number[]
    },
    properties: {
      id: number,
      image: string,
      name: string
    }
  }[]
} | null;
