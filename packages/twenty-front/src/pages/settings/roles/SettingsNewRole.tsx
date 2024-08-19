import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconSettings } from 'twenty-ui';
import { z } from 'zod';

import { SaveAndCancelButtons } from '@/settings/components/SaveAndCancelButtons/SaveAndCancelButtons';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import {
  SettingsRoleAboutForm,
  SettingsRoleFormSchema,
} from '@/settings/roles/forms/SettingsRoleAboutForm';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useMockRole } from '~/pages/settings/roles/useMockRoles';

const newRoleFormSchema = SettingsRoleFormSchema;

type SettingsNewRoleSchemaValues = z.infer<typeof newRoleFormSchema>;

export const SettingsNewRole = () => {
  const navigate = useNavigate();
  const { enqueueSnackBar } = useSnackBar();

  const formConfig = useForm<SettingsNewRoleSchemaValues>({
    mode: 'onTouched',
    resolver: zodResolver(newRoleFormSchema),
  });

  const { isValid, isSubmitting } = formConfig.formState;
  const canSave = isValid && !isSubmitting;

  const settingsRolesPagePath = getSettingsPagePath(SettingsPath.MembersRoles);

  const { createRole } = useMockRole();

  const onSave = async (formValue: SettingsNewRoleSchemaValues) => {
    try {
      const roleData = {
        ...formValue,
        description: formValue.description ?? '',
        isCustom: formValue.isCustom ?? true,
        isRemote: formValue.isRemote ?? false,
        archived: formValue.archived ?? false,
        usersId: formValue.usersId ?? 0,
      };

      await createRole(roleData);
      navigate(settingsRolesPagePath);
    } catch (err) {
      enqueueSnackBar((err as Error).message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formConfig}>
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
              isSaveDisabled={!canSave}
              isCancelDisabled={isSubmitting}
              onCancel={() => navigate(settingsRolesPagePath)}
              onSave={formConfig.handleSubmit(onSave)}
            />
          </SettingsHeaderContainer>
          <SettingsRoleAboutForm />
        </SettingsPageContainer>
      </SubMenuTopBarContainer>
    </FormProvider>
  );
};
