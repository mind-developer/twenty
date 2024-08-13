import styled from '@emotion/styled';
import { H1Title, H2Title, IconSettings } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { DeleteWorkspace } from '@/settings/profile/components/DeleteWorkspace';
import { NameField } from '@/settings/workspace/components/NameField';
import { ToggleImpersonate } from '@/settings/workspace/components/ToggleImpersonate';
import { WorkspaceLogoUploader } from '@/settings/workspace/components/WorkspaceLogoUploader';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { useTranslation } from 'react-i18next';

const StyledH1Title = styled(H1Title)`
  margin-bottom: 0;
`;

export const SettingsWorkspace = () => {
  const { t } = useTranslation();

  return (
  <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
    <SettingsPageContainer>
      <StyledH1Title title={t('general')} />
      <Section>
        <H2Title title={t('picture')} />
        <WorkspaceLogoUploader />
      </Section>
      <Section>
        <H2Title title={t('name')} description={t('nameDescription')} />
        <NameField />
      </Section>
      <Section>
        <H2Title
          title={t('support')}
          addornment={<ToggleImpersonate />}
          description={t('supportDescription')}
        />
      </Section>
      <Section>
        <DeleteWorkspace />
      </Section>
    </SettingsPageContainer>
  </SubMenuTopBarContainer>
  );
};
