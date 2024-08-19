import { ReactFlowProvider } from 'reactflow';
import { IconSettings } from 'twenty-ui';

import { SettingsDataRoleOverview } from '@/settings/roles/graph-overview/SettingsDataRoleOverview';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';

export const SettingsRolesOverview = () => {
  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <ReactFlowProvider>
        <SettingsDataRoleOverview />
      </ReactFlowProvider>
    </SubMenuTopBarContainer>
  );
};
