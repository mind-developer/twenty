import {
  IconArchive,
  IconDotsVertical,
  IconEye,
  IconPencil,
  IconTextSize,
} from 'twenty-ui';

import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';

type SettingsRoleFieldActionDropdownProps = {
  isCustomField?: boolean;
  onDeactivate?: () => void;
  onEdit: (action: ActionType) => void;
  onSetAsLabelIdentifier?: () => void;
  scopeKey: string;
};

export type ActionType = 'Edit' | 'View';

export const SettingsRoleFieldActionDropdown = ({
  isCustomField,
  onDeactivate,
  onEdit,
  onSetAsLabelIdentifier,
  scopeKey,
}: SettingsRoleFieldActionDropdownProps) => {
  const dropdownId = `${scopeKey}-settings-field-active-action-dropdown`;

  const { closeDropdown } = useDropdown(dropdownId);

  const handleEdit = (action: ActionType) => {
    onEdit(action);
    closeDropdown();
  };

  const handleDeactivate = () => {
    onDeactivate?.();
    closeDropdown();
  };

  const handleSetAsLabelIdentifier = () => {
    onSetAsLabelIdentifier?.();
    closeDropdown();
  };

  return (
    <Dropdown
      dropdownId={dropdownId}
      clickableComponent={
        <LightIconButton
          aria-label="Active Field Options"
          Icon={IconDotsVertical}
          accent="tertiary"
        />
      }
      dropdownComponents={
        <DropdownMenu width="160px">
          <DropdownMenuItemsContainer>
            <MenuItem
              text={isCustomField ? 'Edit' : 'View'}
              LeftIcon={isCustomField ? IconPencil : IconEye}
              onClick={() => handleEdit(isCustomField ? 'Edit' : 'View')}
            />
            {!!onSetAsLabelIdentifier && (
              <MenuItem
                text="Set as record text"
                LeftIcon={IconTextSize}
                onClick={handleSetAsLabelIdentifier}
              />
            )}
            {!!onDeactivate && (
              <MenuItem
                text="Deactivate"
                LeftIcon={IconArchive}
                onClick={handleDeactivate}
              />
            )}
          </DropdownMenuItemsContainer>
        </DropdownMenu>
      }
      dropdownHotkeyScope={{
        scope: dropdownId,
      }}
    />
  );
};
