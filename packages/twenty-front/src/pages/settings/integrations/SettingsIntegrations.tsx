import { IconSettings } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsIntegrationGroup } from '@/settings/integrations/components/SettingsIntegrationGroup';
import { useSettingsIntegrationCategories } from '@/settings/integrations/hooks/useSettingsIntegrationCategories';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useTranslation } from 'react-i18next';

export const SettingsIntegrations = () => {
  const integrationCategories = useSettingsIntegrationCategories();

  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <Breadcrumb links={[{ children: t('integrations') }]} />
        {integrationCategories.map((group) => (
          <SettingsIntegrationGroup key={group.key} integrationGroup={group} />
        ))}
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
