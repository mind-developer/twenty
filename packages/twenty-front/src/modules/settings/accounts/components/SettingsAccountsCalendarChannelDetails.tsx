import { CalendarChannel } from '@/accounts/types/CalendarChannel';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SettingsAccountsEventVisibilitySettingsCard } from '@/settings/accounts/components/SettingsAccountsCalendarVisibilitySettingsCard';
import { SettingsAccountsToggleSettingCard } from '@/settings/accounts/components/SettingsAccountsToggleSettingCard';
import styled from '@emotion/styled';
import { Section } from '@react-email/components';
import { useTranslation } from 'react-i18next';
import { H2Title } from 'twenty-ui';
import { CalendarChannelVisibility } from '~/generated-metadata/graphql';
import i18n from '~/utils/i18n/index';

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

type SettingsAccountsCalendarChannelDetailsProps = {
  calendarChannel: Pick<
    CalendarChannel,
    'id' | 'visibility' | 'isContactAutoCreationEnabled' | 'isSyncEnabled'
  >;
};

export const SettingsAccountsCalendarChannelDetails = ({
  calendarChannel,
}: SettingsAccountsCalendarChannelDetailsProps) => {
  const { updateOneRecord } = useUpdateOneRecord<CalendarChannel>({
    objectNameSingular: CoreObjectNameSingular.CalendarChannel,
  });

  const handleVisibilityChange = (value: CalendarChannelVisibility) => {
    updateOneRecord({
      idToUpdate: calendarChannel.id,
      updateOneRecordInput: {
        visibility: value,
      },
    });
  };

  const handleContactAutoCreationToggle = (value: boolean) => {
    updateOneRecord({
      idToUpdate: calendarChannel.id,
      updateOneRecordInput: {
        isContactAutoCreationEnabled: value,
      },
    });
  };

  const { t } = useTranslation();
  return (
    <StyledDetailsContainer>
      <Section>
        <H2Title
          title={t('visibility')}
          description={t('visibilityDescription')}
        />
        <SettingsAccountsEventVisibilitySettingsCard
          value={calendarChannel.visibility}
          onChange={handleVisibilityChange}
        />
      </Section>
      <Section>
        <H2Title
          title={t('contactAutoCreation')}
          description={t('contactAutoCreationCalendarDescription')}
        />
        <SettingsAccountsToggleSettingCard
          parameters={[
            {
              value: !!calendarChannel.isContactAutoCreationEnabled,
              title: i18n.t('autoCreation'),
              description: i18n.t('autoCreationDescription'),
              onToggle: handleContactAutoCreationToggle,
            },
          ]}
        />
      </Section>
    </StyledDetailsContainer>
  );
};
