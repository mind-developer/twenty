import styled from '@emotion/styled';
import { H1Title, H2Title, IconPlus, IconSettings } from 'twenty-ui';

import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsRoleCoverImage } from '@/settings/roles/SettingsRoleCoverImage';
import { SettingsRoleFieldActionDropdown } from '@/settings/roles/role-details/SettingsRoleFieldActionDropdown';
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

const StyledH1Title = styled(H1Title)`
  margin-bottom: 0;
`;

// Mock Test
const mockRoleItems = [
  {
    namePlural: 'Manager',
    labelPlural: 'Admin',
    isCustom: false,
    isRemote: false,
  },
  {
    namePlural: 'Support',
    labelPlural: 'Support',
    isCustom: false,
    isRemote: false,
  },
  {
    namePlural: 'Sales',
    labelPlural: 'Sales',
    isCustom: false,
    isRemote: false,
  },
  {
    namePlural: 'Finance',
    labelPlural: 'Finance',
    isCustom: true,
    isRemote: false,
  },
];

export const SettingsRoles = () => {
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
              <TableSection title="Active">
                {mockRoleItems.map((roleItem) => (
                  <SettingsRoleItemTableRow
                    roleItem={roleItem}
                    actions={
                      <SettingsRoleFieldActionDropdown
                        isCustomField={roleItem.isCustom}
                        scopeKey={roleItem.namePlural}
                        onEdit={() => console.log('Edit')}
                      />
                    }
                  />
                ))}
              </TableSection>
            </Table>
          </Section>
        </div>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
