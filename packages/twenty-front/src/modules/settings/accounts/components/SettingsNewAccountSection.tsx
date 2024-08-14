import { H2Title } from 'twenty-ui';

import { SettingsAccountsListEmptyStateCard } from '@/settings/accounts/components/SettingsAccountsListEmptyStateCard';
import { Section } from '@/ui/layout/section/components/Section';
import { useTranslation } from 'react-i18next';

export const SettingsNewAccountSection = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <H2Title
        title={t('newAccount')}
        description={t('newAccountDescription')}
      />
      <SettingsAccountsListEmptyStateCard label={t('connectGoogleAccount')} />
    </Section>
  );
};
