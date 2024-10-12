export interface Props {
  activeTab: number | string;
  onChangeTab: (activeTab: number | string) => void;
  actions: { key: number | string; label: string }[];
}
