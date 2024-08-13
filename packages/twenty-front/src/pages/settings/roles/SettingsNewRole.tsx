import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { SaveAndCancelButtons } from '@/settings/components/SaveAndCancelButtons/SaveAndCancelButtons';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsRoleAboutForm } from '@/settings/roles/forms/SettingsRoleAboutForm';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { IconSettings } from 'twenty-ui';

export const SettingsNewRole = () => {
  const navigate = useNavigate();

  const settingsRolesPagePath = getSettingsPagePath(SettingsPath.MembersRoles);

  const formMethods = useForm();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formMethods}>
      <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
        <SettingsPageContainer>
          <SettingsHeaderContainer>
            <Breadcrumb
              links={[
                {
                  children: 'Roles',
                  href: settingsRolesPagePath,
                },
                { children: 'Add roles to your workspace' },
              ]}
            />
            <SaveAndCancelButtons
              // isSaveDisabled={!canSave}
              // isCancelDisabled={isSubmitting}
              onCancel={() => navigate(settingsRolesPagePath)}
              // onSave={formConfig.handleSubmit(handleSave)}
            />
          </SettingsHeaderContainer>
          <SettingsRoleAboutForm />
        </SettingsPageContainer>
      </SubMenuTopBarContainer>
    </FormProvider>
  );
};
