export interface Props {
  actions: { key: number | string; label: string }[];
  handlePressTab: (key: number | string) => void;
  active_tab: number | string;
}
