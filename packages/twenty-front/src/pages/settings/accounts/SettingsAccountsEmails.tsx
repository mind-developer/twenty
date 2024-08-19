import { IconSettings } from 'twenty-ui';

import { SettingsAccountsMessageChannelsContainer } from '@/settings/accounts/components/SettingsAccountsMessageChannelsContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useTranslation } from 'react-i18next';

export const SettingsAccountsEmails = () => {
const { t } = useTranslation();
  
return(
  <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
    <SettingsPageContainer>
      <Breadcrumb
        links={[
          { children: t('accounts'), href: '/settings/accounts' },
          { children: t('emails') },
        ]}
      />
      <Section>
        <SettingsAccountsMessageChannelsContainer />
      </Section>
    </SettingsPageContainer>
  </SubMenuTopBarContainer>
  );
};
