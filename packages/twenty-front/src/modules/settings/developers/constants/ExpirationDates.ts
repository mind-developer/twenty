import { NEVER_EXPIRE_DELTA_IN_YEARS } from '@/settings/developers/constants/NeverExpireDeltaInYears';
import i18n from '~/utils/i18n/index';

export const EXPIRATION_DATES: {
  value: number | null;
  label: string;
}[] = [
  { label: '15d', value: 15 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: i18n.t('oneYear'), value: 365 },
  { label: i18n.t('twoYears'), value: 2 * 365 },
  { label: i18n.t('never'), value: NEVER_EXPIRE_DELTA_IN_YEARS * 365 },
];
