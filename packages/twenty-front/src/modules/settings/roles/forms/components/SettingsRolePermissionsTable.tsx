import styled from '@emotion/styled';

import { Checkbox } from '@/ui/input/components/Checkbox';

// Mock Test
const mockPermissions = [
  {
    id: 1,
    tableName: 'Companies',
    permissions: {
      create: false,
      edit: false,
      view: false,
      delete: false,
    },
  },
  {
    id: 2,
    tableName: 'People',
    permissions: {
      create: false,
      edit: false,
      view: false,
      delete: false,
    },
  },
  {
    id: 3,
    tableName: 'Lead',
    permissions: {
      create: false,
      edit: false,
      view: false,
      delete: false,
    },
  },
];

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead th,
  tbody td {
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid ${({ theme }) => theme.border.color.medium};
  }

  thead div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing(1)};
  }
`;

const StyledCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledCheckbox = styled(Checkbox)`
  justify-content: center;
`;

export const SettingsRolePermissionsTable = () => {
  // TODO: implement multiple checkbox selects when the backend is ready
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>
            <div>
              <Checkbox
                checked={false}
                onChange={() => console.log('Action: table')}
              />
              Table
            </div>
          </th>
          {['create', 'edit', 'view', 'delete'].map((action) => (
            <th key={action}>
              <div>
                <Checkbox
                  checked={false}
                  onChange={() => console.log(`Action: ${action}`)}
                />
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mockPermissions.map((row) => (
          <tr key={row.id}>
            <StyledCell>
              <Checkbox
                checked={Object.values(row.permissions).every(Boolean)}
                onChange={() => console.log(`Action: ${row.tableName}`)}
              />
              {row.tableName}
            </StyledCell>
            {['create', 'edit', 'view', 'delete'].map((action) => (
              <td key={action}>
                <StyledCheckbox
                  checked={false}
                  onChange={() => console.log(`Action: ${action}`)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};
