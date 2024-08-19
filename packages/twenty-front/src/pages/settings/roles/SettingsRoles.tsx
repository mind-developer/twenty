import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { H1Title, H2Title, IconPlus, IconSettings } from 'twenty-ui';

import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsRoleCoverImage } from '@/settings/roles/SettingsRoleCoverImage';
import {
  ActionType,
  SettingsRoleFieldActionDropdown,
} from '@/settings/roles/role-details/SettingsRoleFieldActionDropdown';
import { SettingsRoleFieldDisabledActionDropdown } from '@/settings/roles/role-details/SettingsRoleFieldDisabledActionDropdown';
import {
  SettingsRoleItemTableRow,
  StyledRoleTableRow,
} from '@/settings/roles/role-details/SettingsRoleItemTableRow';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Table } from '@/ui/layout/table/components/Table';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableSection } from '@/ui/layout/table/components/TableSection';
import { UndecoratedLink } from '@/ui/navigation/link/components/UndecoratedLink';

import { useMockRole } from './useMockRoles';

const StyledH1Title = styled(H1Title)`
  margin-bottom: 0;
`;

export const SettingsRoles = () => {
  const { roles, toggleArchived, deleteRole } = useMockRole();
  const navigate = useNavigate();

  // TODO: when integrating with the backend, redo the paths so that they are standardized in lower case (Problems with : { children: `${roleSlug}` })
  const handleEditRole = (roleName: string, action: ActionType) => {
    const path =
      action === 'Edit'
        ? getSettingsPagePath(SettingsPath.EditRole).replace(
            ':roleSlug',
            roleName,
          )
        : getSettingsPagePath(SettingsPath.ViewRole).replace(
            ':roleSlug',
            roleName,
          );

    navigate(path);
  };

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <SettingsHeaderContainer>
          <StyledH1Title title="Roles" />
          <UndecoratedLink to={getSettingsPagePath(SettingsPath.NewRole)}>
            <Button
              Icon={IconPlus}
              title="New role"
              accent="blue"
              size="small"
            />
          </UndecoratedLink>
        </SettingsHeaderContainer>
        <div>
          <SettingsRoleCoverImage />
          <Section>
            <H2Title title="Existing roles" />
            <Table>
              <StyledRoleTableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader align="right">Users</TableHeader>
                <TableHeader></TableHeader>
                <TableHeader></TableHeader>
              </StyledRoleTableRow>
              {roles.length > 0 && (
                <>
                  {roles.some((role) => !role.archived) && (
                    <TableSection title="Active">
                      {roles
                        .filter((role) => !role.archived)
                        .map((roleItem) => (
                          <SettingsRoleItemTableRow
                            key={roleItem.id}
                            roleItem={roleItem}
                            actions={
                              <SettingsRoleFieldActionDropdown
                                isCustomField={roleItem.isCustom}
                                scopeKey={roleItem.name}
                                onEdit={(action) =>
                                  handleEditRole(roleItem.name, action)
                                }
                                onDeactivate={() => toggleArchived(roleItem.id)}
                              />
                            }
                          />
                        ))}
                    </TableSection>
                  )}
                  {roles.some((role) => role.archived) && (
                    <TableSection title="Inactive">
                      {roles
                        .filter((role) => role.archived)
                        .map((roleItem) => (
                          <SettingsRoleItemTableRow
                            key={roleItem.id}
                            roleItem={roleItem}
                            actions={
                              <SettingsRoleFieldDisabledActionDropdown
                                isCustomField={roleItem.isCustom}
                                scopeKey={roleItem.name}
                                roleId={roleItem.id}
                                onActivate={() => toggleArchived(roleItem.id)}
                                onDelete={() => deleteRole(roleItem.id)}
                              />
                            }
                          />
                        ))}
                    </TableSection>
                  )}
                </>
              )}
            </Table>
          </Section>
        </div>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
