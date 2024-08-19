import styled from '@emotion/styled';
import { H1Title, H2Title, IconSettings } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { ColorSchemePicker } from '@/ui/input/color-scheme/components/ColorSchemePicker';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { useColorScheme } from '@/ui/theme/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import { DateTimeSettings } from '~/pages/settings/profile/appearance/components/DateTimeSettings';

const StyledH1Title = styled(H1Title)`
  margin-bottom: 0;
`;

export const SettingsAppearance = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <StyledH1Title title={t('appearance')} />
        <Section>
          <H2Title title={t('theme')} />
          <ColorSchemePicker value={colorScheme} onChange={setColorScheme} />
        </Section>
        <Section>
          <H2Title
            title="Date and time"
            description="Configure how dates are displayed across the app"
          />
          <DateTimeSettings />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
