import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { H2Title, IconArchive, IconSettings } from 'twenty-ui';

import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsRoleAboutForm } from '@/settings/roles/forms/SettingsRoleAboutForm';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useMockRole } from '~/pages/settings/roles/useMockRoles';

export const SettingsRoleView = () => {
  const navigate = useNavigate();
  const { enqueueSnackBar } = useSnackBar();
  const { findRoleByName, updateRole } = useMockRole();
  const formMethods = useForm();

  const { roleSlug } = useParams<{ roleSlug?: string }>();
  const validRoleSlug = roleSlug ?? '';

  const activeRole = findRoleByName(validRoleSlug);

  const settingsRolesPagePath = getSettingsPagePath(SettingsPath.MembersRoles);

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
    <FormProvider {...formMethods}>
      <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
        <SettingsPageContainer>
          <SettingsHeaderContainer>
            <Breadcrumb
              links={[
                {
                  children: 'Roles',
                  href: `${settingsRolesPagePath}`,
                },
                { children: `${roleSlug}` },
              ]}
            />
          </SettingsHeaderContainer>
          <SettingsRoleAboutForm roleItem={activeRole} disabled={true} />
          <Section>
            <H2Title title="Danger zone" description="Deactivate this role" />
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
