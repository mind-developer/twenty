import styled from '@emotion/styled';
import { H1Title, H2Title, IconSettings } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { ChangeLanguage } from '@/settings/profile/components/ChangeLanguage';
import { ChangePassword } from '@/settings/profile/components/ChangePassword';
import { DeleteAccount } from '@/settings/profile/components/DeleteAccount';
import { EmailField } from '@/settings/profile/components/EmailField';
import { NameFields } from '@/settings/profile/components/NameFields';
import { ProfilePictureUploader } from '@/settings/profile/components/ProfilePictureUploader';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { useTranslation } from 'react-i18next';

const StyledH1Title = styled(H1Title)`
  margin-bottom: 0;
`;

export const SettingsProfile = () => {
  const { t } = useTranslation();
  return(
  <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
    <SettingsPageContainer>
      <StyledH1Title title={t('profile')} />
      <Section>
        <H2Title title={t('picture')} />
        <ProfilePictureUploader />
      </Section>
      <Section>
        <H2Title title={t('name')} description={t('nameProfileDescription')} />
        <NameFields />
      </Section>
      <Section>
        <H2Title
          title={t('email')}
          description={t('emailProfileDescription')}
        />
        <EmailField />
      </Section>
      <Section>
        <H2Title
          title={t('language')}
          description={t('languageDescription')}
        />
        <ChangeLanguage />
      </Section>
      <Section>
        <ChangePassword />
      </Section>
      <Section>
        <DeleteAccount />
      </Section>
    </SettingsPageContainer>
  </SubMenuTopBarContainer>
)};
