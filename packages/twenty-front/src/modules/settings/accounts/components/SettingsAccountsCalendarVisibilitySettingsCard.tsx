import styled from '@emotion/styled';

import { SettingsAccountsRadioSettingsCard } from '@/settings/accounts/components/SettingsAccountsRadioSettingsCard';
import { SettingsAccountsVisibilityIcon } from '@/settings/accounts/components/SettingsAccountsVisibilityIcon';
import { CalendarChannelVisibility } from '~/generated/graphql';
import i18n from '~/utils/i18n/index';

type SettingsAccountsEventVisibilitySettingsCardProps = {
  onChange: (nextValue: CalendarChannelVisibility) => void;
  value?: CalendarChannelVisibility;
};

const StyledCardMedia = styled(SettingsAccountsVisibilityIcon)`
  height: ${({ theme }) => theme.spacing(6)};
`;

const eventSettingsVisibilityOptions = [
  {
    title: i18n.t('everything'),
    description: i18n.t('everythingCalendarDescription'),
    value: CalendarChannelVisibility.ShareEverything,
    cardMedia: <StyledCardMedia subject="active" body="active" />,
  },
  {
    title: i18n.t('metadata'),
    description: i18n.t('metadataCalendarDescription'),
    value: CalendarChannelVisibility.Metadata,
    cardMedia: <StyledCardMedia subject="active" body="inactive" />,
  },
];

export const SettingsAccountsEventVisibilitySettingsCard = ({
  onChange,
  value = CalendarChannelVisibility.ShareEverything,
}: SettingsAccountsEventVisibilitySettingsCardProps) => (
  <SettingsAccountsRadioSettingsCard
    name="event-visibility"
    options={eventSettingsVisibilityOptions}
    value={value}
    onChange={onChange}
  />
);
