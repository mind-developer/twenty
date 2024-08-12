import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { IconId } from '@tabler/icons-react';
import { SettingsRoleTypeTag } from '@/settings/roles/SettingsRoleTypeFlag';
import { getRoleTypeLabel } from '@/settings/roles/utils/getRoleTypeLabel';
import { ReactNode } from 'react';

type RoleType = {
  namePlural: string;
  labelPlural: string;
  isCustom: boolean;
  isRemote: boolean;
};

type SettingsRoleItemTableRowProps = {
  actions: ReactNode;
  roleItem: RoleType;
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

  // Mock Test
  const totalCount = 23;
  const Icon = IconId;
  const roleTypeLabel = getRoleTypeLabel(roleItem);

  return (
    <StyledRoleTableRow key={roleItem.namePlural}>
      <StyledNameTableCell>
        {!!Icon && (
          <Icon size={theme.icon.size.md} stroke={theme.icon.stroke.sm} />
        )}
        {roleItem.labelPlural}
      </StyledNameTableCell>
      <TableCell>
        <SettingsRoleTypeTag roleTypeLabel={roleTypeLabel} />
      </TableCell>
      <TableCell align="right">{totalCount}</TableCell>
      <TableCell></TableCell>
      <TableCell>{actions}</TableCell>
    </StyledRoleTableRow>
  );
};
