import { MessageChannelContactAutoCreationPolicy } from '@/accounts/types/MessageChannel';
import { SettingsAccountsMessageAutoCreationIcon } from '@/settings/accounts/components/SettingsAccountsMessageAutoCreationIcon';
import { SettingsAccountsRadioSettingsCard } from '@/settings/accounts/components/SettingsAccountsRadioSettingsCard';
import i18n from '~/utils/i18n/index';

type SettingsAccountsMessageAutoCreationCardProps = {
  onChange: (nextValue: MessageChannelContactAutoCreationPolicy) => void;
  value?: MessageChannelContactAutoCreationPolicy;
};

const autoCreationOptions = [
  {
    title: i18n.t('sendAndReceived'),
    description: i18n.t('sendAndReceivedDescription'),
    value: MessageChannelContactAutoCreationPolicy.SENT_AND_RECEIVED,
    cardMedia: (
      <SettingsAccountsMessageAutoCreationIcon isSentActive isReceivedActive />
    ),
  },
  {
    title: i18n.t('sent'),
    description: i18n.t('sentDescription'),
    value: MessageChannelContactAutoCreationPolicy.SENT,
    cardMedia: <SettingsAccountsMessageAutoCreationIcon isSentActive />,
  },
  {
    title: i18n.t('none'),
    description: i18n.t('noneDescription'),
    value: MessageChannelContactAutoCreationPolicy.NONE,
    cardMedia: (
      <SettingsAccountsMessageAutoCreationIcon
        isSentActive={false}
        isReceivedActive={false}
      />
    ),
  },
];

export const SettingsAccountsMessageAutoCreationCard = ({
  onChange,
  value = MessageChannelContactAutoCreationPolicy.SENT_AND_RECEIVED,
}: SettingsAccountsMessageAutoCreationCardProps) => (
  <SettingsAccountsRadioSettingsCard
    name="message-auto-creation"
    options={autoCreationOptions}
    value={value}
    onChange={onChange}
  />
);
