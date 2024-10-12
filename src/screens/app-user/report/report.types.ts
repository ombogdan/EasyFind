import { ReportType } from "shared/types";

export const OPTION_LIST = [
  { key: ReportType.this_is_spam, label: 'This is spam' },
  {
    key: ReportType.abusive_or_harmful,
    label: 'Abusive or harmful implications',
  },
  { key: ReportType.hateful_speech, label: 'Hateful speech' },
  {
    key: ReportType.contains_false_information,
    label: 'Contains false information',
  },
  {
    key: ReportType.expresses_thoughts_self_harm,
    label: 'Expresses thoughts of self-harm',
  },
  { key: ReportType.advocates_violence, label: 'Advocates violence' },
  { key: ReportType.other, label: 'Other ...' },
];