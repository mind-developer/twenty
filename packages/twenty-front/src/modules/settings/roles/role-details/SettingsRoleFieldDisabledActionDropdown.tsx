import styled from '@emotion/styled';
import { useState } from 'react';

import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { Modal } from '@/ui/layout/modal/components/Modal';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';
import { IconArchiveOff, IconDotsVertical, IconTrash } from 'twenty-ui';
import { FieldMetadataType } from '~/generated-metadata/graphql';

type SettingsRoleFieldDisabledActionDropdownProps = {
  isCustomField?: boolean;
  fieldType?: FieldMetadataType;
  onActivate?: () => void;
  onDelete?: (roleId: number) => void;
  scopeKey: string;
  roleId: number;
};

const StyledModal = styled(Modal)`
  text-align: center;

  p {
    margin-top: 0;
  }
`;

const StyledButton = styled(MenuItem)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.background.transparent.light};

  ${({ accent, theme }) =>
    accent === 'danger' &&
    `
    border: 1px solid ${theme.background.transparent.danger};
  `}

  div {
    justify-content: center;
  }
`;

const StyledModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsRoleFieldDisabledActionDropdown = ({
  isCustomField,
  onActivate = () => {},
  onDelete = () => {},
  scopeKey,
  roleId,
}: SettingsRoleFieldDisabledActionDropdownProps) => {
  const dropdownId = `${scopeKey}-settings-field-disabled-action-dropdown`;

  const { closeDropdown } = useDropdown(dropdownId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActivate = () => {
    onActivate();
    closeDropdown();
  };

  const handleDelete = () => {
    setIsModalOpen(true);
    closeDropdown();
  };

  const confirmDelete = () => {
    onDelete(roleId);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const isDeletable = isCustomField;

  return (
    <>
      <Dropdown
        dropdownId={dropdownId}
        clickableComponent={
          <LightIconButton Icon={IconDotsVertical} accent="tertiary" />
        }
        dropdownComponents={
          <DropdownMenu width="160px">
            <DropdownMenuItemsContainer>
              <MenuItem
                text="Activate"
                LeftIcon={IconArchiveOff}
                onClick={handleActivate}
              />
              {isDeletable && (
                <MenuItem
                  text="Delete"
                  accent="danger"
                  LeftIcon={IconTrash}
                  onClick={handleDelete}
                />
              )}
            </DropdownMenuItemsContainer>
          </DropdownMenu>
        }
        dropdownHotkeyScope={{
          scope: dropdownId,
        }}
      />
      <StyledModal isOpen={isModalOpen} size="small" padding="medium">
        <h2>Delete role</h2>
        <p>This will permanently delete this role.</p>
        <StyledModalFooter>
          <StyledButton
            text="Cancel"
            onClick={cancelDelete}
            isIconDisplayedOnHoverOnly={false}
          />
          <StyledButton
            text="Continue"
            accent="danger"
            onClick={confirmDelete}
            isIconDisplayedOnHoverOnly={false}
          />
        </StyledModalFooter>
      </StyledModal>
    </>
  );
};
