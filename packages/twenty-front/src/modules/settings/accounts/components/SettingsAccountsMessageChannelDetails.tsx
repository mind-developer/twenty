import styled from '@emotion/styled';
import { H2Title } from 'twenty-ui';

import {
  MessageChannel,
  MessageChannelContactAutoCreationPolicy,
} from '@/accounts/types/MessageChannel';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SettingsAccountsMessageAutoCreationCard } from '@/settings/accounts/components/SettingsAccountsMessageAutoCreationCard';
import { SettingsAccountsMessageVisibilityCard } from '@/settings/accounts/components/SettingsAccountsMessageVisibilityCard';
import { SettingsAccountsToggleSettingCard } from '@/settings/accounts/components/SettingsAccountsToggleSettingCard';
import { Section } from '@/ui/layout/section/components/Section';
import { MessageChannelVisibility } from '~/generated-metadata/graphql';
import { useTranslation } from 'react-i18next';
import i18n from '~/utils/i18n/index';

type SettingsAccountsMessageChannelDetailsProps = {
  messageChannel: Pick<
    MessageChannel,
    | 'id'
    | 'visibility'
    | 'contactAutoCreationPolicy'
    | 'excludeNonProfessionalEmails'
    | 'excludeGroupEmails'
    | 'isSyncEnabled'
  >;
};

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

export const SettingsAccountsMessageChannelDetails = ({
  messageChannel,
}: SettingsAccountsMessageChannelDetailsProps) => {
  const { updateOneRecord } = useUpdateOneRecord<MessageChannel>({
    objectNameSingular: CoreObjectNameSingular.MessageChannel,
  });

  const handleVisibilityChange = (value: MessageChannelVisibility) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        visibility: value,
      },
    });
  };

  const handleContactAutoCreationChange = (
    value: MessageChannelContactAutoCreationPolicy,
  ) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        contactAutoCreationPolicy: value,
      },
    });
  };

  const handleIsGroupEmailExcludedToggle = (value: boolean) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        excludeGroupEmails: value,
      },
    });
  };

  const handleIsNonProfessionalEmailExcludedToggle = (value: boolean) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        excludeNonProfessionalEmails: value,
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
        <SettingsAccountsMessageVisibilityCard
          value={messageChannel.visibility}
          onChange={handleVisibilityChange}
        />
      </Section>
      <Section>
        <H2Title
          title={t('contactAutoCreation')}
          description={t('contactAutoCreationDescription')}
        />
        <SettingsAccountsMessageAutoCreationCard
          value={messageChannel.contactAutoCreationPolicy}
          onChange={handleContactAutoCreationChange}
        />
      </Section>
      <Section>
        <SettingsAccountsToggleSettingCard
          parameters={[
            {
              title: i18n.t('excludeNonProfessionalEmails'),
              description: i18n.t('excludeNonProfessionalEmailsDescription'),
              value: !!messageChannel.excludeNonProfessionalEmails,
              onToggle: handleIsNonProfessionalEmailExcludedToggle,
            },
            {
              title: i18n.t('excludeGroupEmails'),
              description: i18n.t('excludeGroupEmailsDescription'),
              value: !!messageChannel.excludeGroupEmails,
              onToggle: handleIsGroupEmailExcludedToggle,
            },
          ]}
        />
      </Section>
    </StyledDetailsContainer>
  );
};
