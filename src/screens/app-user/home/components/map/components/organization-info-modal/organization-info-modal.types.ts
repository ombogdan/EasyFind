export interface OrganizationMarkerProps {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
  selectedMarkerId: number | null;
  onSelect: () => void;
}
