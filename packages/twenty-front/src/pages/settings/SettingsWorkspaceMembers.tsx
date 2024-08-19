import styled from '@emotion/styled';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { H1Title, H2Title, IconSettings, IconTrash } from 'twenty-ui';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { IconButton } from '@/ui/input/button/components/IconButton';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { WorkspaceMember } from '@/workspace-member/types/WorkspaceMember';
import { WorkspaceInviteLink } from '@/workspace/components/WorkspaceInviteLink';
import { WorkspaceInviteTeam } from '@/workspace/components/WorkspaceInviteTeam';
import { WorkspaceMemberCard } from '@/workspace/components/WorkspaceMemberCard';
import { WorkspaceMember } from '@/workspace-member/types/WorkspaceMember';
import { useTranslation } from 'react-i18next';

const StyledH1Title = styled(H1Title)`
  margin-bottom: 0;
`;

const StyledButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-left: ${({ theme }) => theme.spacing(3)};
`;

export const SettingsWorkspaceMembers = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [workspaceMemberToDelete, setWorkspaceMemberToDelete] = useState<
    string | undefined
  >();

  const { records: workspaceMembers } = useFindManyRecords<WorkspaceMember>({
    objectNameSingular: CoreObjectNameSingular.WorkspaceMember,
  });
  const { deleteOneRecord: deleteOneWorkspaceMember } = useDeleteOneRecord({
    objectNameSingular: CoreObjectNameSingular.WorkspaceMember,
  });
  const currentWorkspace = useRecoilValue(currentWorkspaceState);
  const currentWorkspaceMember = useRecoilValue(currentWorkspaceMemberState);

  const handleRemoveWorkspaceMember = async (workspaceMemberId: string) => {
    await deleteOneWorkspaceMember?.(workspaceMemberId);
    setIsConfirmationModalOpen(false);
  };

  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <StyledH1Title title={t('members')} />
        <Section>
          <H2Title
            title={t('membersInviteEmail')}
            description={t('membersInviteEmailDescription')}
          />
          <WorkspaceInviteTeam />
        </Section>
        {currentWorkspace?.inviteHash && (
          <Section>
            <H2Title
              title={t('membersInviteLink')}
              description={t('membersInviteLinkDescription')}
            />
            <WorkspaceInviteLink
              inviteLink={`${window.location.origin}/invite/${currentWorkspace?.inviteHash}`}
            />
          </Section>
        )}
        <Section>
          <H2Title
            title={t('members')}
            description={t('membersDescription')}
          />
          {workspaceMembers?.map((member) => (
            <WorkspaceMemberCard
              key={member.id}
              workspaceMember={member as WorkspaceMember}
              accessory={
                currentWorkspaceMember?.id !== member.id && (
                  <StyledButtonContainer>
                    <IconButton
                      onClick={() => {
                        setIsConfirmationModalOpen(true);
                        setWorkspaceMemberToDelete(member.id);
                      }}
                      variant="tertiary"
                      size="medium"
                      Icon={IconTrash}
                    />
                  </StyledButtonContainer>
                )
              }
            />
          ))}
        </Section>
      </SettingsPageContainer>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
        title={t('deleteAccountTitle')}
        subtitle={
          <>
            {t('deleteAccountWarning')}
          </>
        }
        onConfirmClick={() =>
          workspaceMemberToDelete &&
          handleRemoveWorkspaceMember(workspaceMemberToDelete)
        }
        deleteButtonText={t('deleteAccountButtonText')}
      />
    </SubMenuTopBarContainer>
  );
};
