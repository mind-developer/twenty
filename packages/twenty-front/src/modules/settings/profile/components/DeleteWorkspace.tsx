import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { H2Title } from 'twenty-ui';

import { useAuth } from '@/auth/hooks/useAuth';
import { currentUserState } from '@/auth/states/currentUserState';
import {
    ConfirmationModal,
    StyledConfirmationButton,
} from '@/ui/layout/modal/components/ConfirmationModal';
import { useTranslation } from 'react-i18next';
import { useDeleteCurrentWorkspaceMutation } from '~/generated/graphql';

export const DeleteWorkspace = () => {
  const [isDeleteWorkSpaceModalOpen, setIsDeleteWorkSpaceModalOpen] =
    useState(false);

  const [deleteCurrentWorkspace] = useDeleteCurrentWorkspaceMutation();
  const currentUser = useRecoilValue(currentUserState);
  const userEmail = currentUser?.email;

  const { signOut } = useAuth();

  const deleteWorkspace = async () => {
    await deleteCurrentWorkspace();
    await signOut();
  };

  const { t } = useTranslation();

  return (
    <>
      <H2Title title={t('dangerZone')} description={t('dangerZoneDescription')} />
      <StyledConfirmationButton
        onClick={() => setIsDeleteWorkSpaceModalOpen(true)}
        variant="secondary"
        title={t('deleteWorkspace')}
      />

      <ConfirmationModal
        confirmationPlaceholder={userEmail}
        confirmationValue={userEmail}
        isOpen={isDeleteWorkSpaceModalOpen}
        setIsOpen={setIsDeleteWorkSpaceModalOpen}
        title={t('deleteWorkspaceTitle')}
        subtitle={
          <>
            {t('deleteWorkspaceWarning')}<br /> {t('confirmEmail')}
          </>
        }
        onConfirmClick={deleteWorkspace}
        deleteButtonText={t('deleteWorkspace')}
      />
    </>
  );
};
