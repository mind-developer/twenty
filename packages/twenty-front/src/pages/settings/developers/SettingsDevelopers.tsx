import styled from '@emotion/styled';
import { H2Title, IconPlus, IconSettings } from 'twenty-ui';

import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsApiKeysTable } from '@/settings/developers/components/SettingsApiKeysTable';
import { SettingsReadDocumentationButton } from '@/settings/developers/components/SettingsReadDocumentationButton';
import { SettingsWebhooksTable } from '@/settings/developers/components/SettingsWebhooksTable';
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useTranslation } from 'react-i18next';

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsDevelopers = () => {
  const { t } = useTranslation();
  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <SettingsHeaderContainer>
          <Breadcrumb links={[{ children: t('developers') }]} />
          <SettingsReadDocumentationButton />
        </SettingsHeaderContainer>
        <Section>
          <H2Title
            title={t('apiKeys')}
            description={t('apiKeysDescription')}
          />
          <SettingsApiKeysTable />
          <StyledButtonContainer>
            <Button
              Icon={IconPlus}
              title={t('createApiKey')}
              size="small"
              variant="secondary"
              to={'/settings/developers/api-keys/new'}
            />
          </StyledButtonContainer>
        </Section>
        <Section>
          <H2Title
            title={t('webhook')}
            description={t('webhookDescription')}
          />
          <SettingsWebhooksTable />
          <StyledButtonContainer>
            <Button
              Icon={IconPlus}
              title={t('createWebhook')}
              size="small"
              variant="secondary"
              to={'/settings/developers/webhooks/new'}
            />
          </StyledButtonContainer>
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
