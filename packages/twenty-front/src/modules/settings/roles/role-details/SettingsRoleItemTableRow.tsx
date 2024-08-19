import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useIcons } from 'twenty-ui';

import { SettingsRoleTypeTag } from '@/settings/roles/SettingsRoleTypeTag';
import { getRoleTypeLabel } from '@/settings/roles/utils/getRoleTypeLabel';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { RoleItem } from '~/pages/settings/roles/useMockRoles';

type SettingsRoleItemTableRowProps = {
  actions: ReactNode;
  roleItem: RoleItem;
  to?: string;
};

export const StyledRoleTableRow = styled(TableRow)`
  grid-template-columns: 180px 98.7px 98.7px 98.7px 36px;
`;

const StyledNameTableCell = styled(TableCell)`
  color: ${({ theme }) => theme.font.color.primary};
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsRoleItemTableRow = ({
  actions,
  roleItem,
  to,
}: SettingsRoleItemTableRowProps) => {
  const theme = useTheme();
  const { getIcon } = useIcons();

  const Icon = getIcon(roleItem.icon);

  const roleTypeLabel = getRoleTypeLabel({
    isCustom: roleItem.isCustom,
    isRemote: roleItem.isRemote,
  });

  return (
    <StyledRoleTableRow key={roleItem.id}>
      <StyledNameTableCell>
        {!!Icon && (
          <Icon size={theme.icon.size.md} stroke={theme.icon.stroke.sm} />
        )}
        {roleItem.name}
      </StyledNameTableCell>
      <TableCell>
        <SettingsRoleTypeTag roleTypeLabel={roleTypeLabel} />
      </TableCell>
      <TableCell align="right">{roleItem.usersId}</TableCell>
      <TableCell></TableCell>
      <TableCell>{actions}</TableCell>
    </StyledRoleTableRow>
  );
};
