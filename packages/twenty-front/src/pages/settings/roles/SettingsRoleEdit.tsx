import { zodResolver } from '@hookform/resolvers/zod';
import pick from 'lodash.pick';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { H2Title, IconArchive, IconSettings } from 'twenty-ui';
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
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useMockRole } from '~/pages/settings/roles/useMockRoles';

const editRoleFormSchema = z.object({}).merge(SettingsRoleFormSchema);

type SettingsEditRoleSchemaValues = z.infer<typeof editRoleFormSchema>;

export const SettingsRoleEdit = () => {
  const navigate = useNavigate();
  const { enqueueSnackBar } = useSnackBar();
  const { findRoleByName, updateRole } = useMockRole();

  const { roleSlug } = useParams<{ roleSlug?: string }>();
  const validRoleSlug = roleSlug ?? '';

  const activeRole = findRoleByName(validRoleSlug);

  const settingsRolesPagePath = getSettingsPagePath(SettingsPath.MembersRoles);

  const formConfig = useForm<SettingsEditRoleSchemaValues>({
    mode: 'onTouched',
    resolver: zodResolver(editRoleFormSchema),
  });

  const { isValid, isSubmitting } = formConfig.formState;
  const canSave = isValid && !isSubmitting;

  const onSave = async (formValues: SettingsEditRoleSchemaValues) => {
    const dirtyFieldsKeys = Object.keys(
      formConfig.formState.dirtyFields,
    ) as (keyof SettingsEditRoleSchemaValues)[];

    try {
      if (activeRole?.id) {
        await updateRole(activeRole.id, pick(formValues, dirtyFieldsKeys));
        navigate(settingsRolesPagePath);
      }
    } catch (err) {
      enqueueSnackBar((err as Error).message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  const handleDisable = async () => {
    try {
      if (activeRole?.id) {
        await updateRole(activeRole.id, { archived: true });
        navigate(settingsRolesPagePath);
      }
    } catch (err) {
      enqueueSnackBar((err as Error).message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  return (
    <FormProvider {...formConfig}>
      <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
        <SettingsPageContainer>
          <SettingsHeaderContainer>
            <Breadcrumb
              links={[
                {
                  children: 'Roles',
                  href: `${settingsRolesPagePath}`,
                },
                { children: 'Edit' },
              ]}
            />
            <SaveAndCancelButtons
              isSaveDisabled={!canSave}
              isCancelDisabled={isSubmitting}
              onCancel={() => navigate(settingsRolesPagePath)}
              onSave={formConfig.handleSubmit(onSave)}
            />
          </SettingsHeaderContainer>
          <SettingsRoleAboutForm roleItem={activeRole} />
          <Section>
            <H2Title title="Danger zone" description="Archive role" />
            <Button
              Icon={IconArchive}
              title="Archive"
              size="small"
              onClick={handleDisable}
            />
          </Section>
        </SettingsPageContainer>
      </SubMenuTopBarContainer>
    </FormProvider>
  );
};
