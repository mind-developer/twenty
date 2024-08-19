import { useRecoilValue } from 'recoil';
import {
  IconApps,
  IconAt,
  IconCalendarEvent,
  IconCode,
  IconColorSwatch,
  IconCurrencyDollar,
  IconDoorEnter,
  IconHierarchy2,
  IconMail,
  IconRocket,
  IconSettings,
  IconUserCircle,
  IconUsers,
  IconFunction,
} from 'twenty-ui';
// eslint-disable-next-line no-restricted-imports
import { IconIdBadge2 } from '@tabler/icons-react';

import { useAuth } from '@/auth/hooks/useAuth';
import { billingState } from '@/client-config/states/billingState';
import { SettingsNavigationDrawerItem } from '@/settings/components/SettingsNavigationDrawerItem';
import { SettingsPath } from '@/types/SettingsPath';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerItemGroup } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItemGroup';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useTranslation } from 'react-i18next';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';

export const SettingsNavigationDrawerItems = () => {
  const { signOut } = useAuth();

  const billing = useRecoilValue(billingState);
  const isFunctionSettingsEnabled = useIsFeatureEnabled(
    'IS_FUNCTION_SETTINGS_ENABLED',
  );
  const isCRMMigrationEnabled = useIsFeatureEnabled('IS_CRM_MIGRATION_ENABLED');

  const { t } = useTranslation();
  return (
    <>
      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle label={t('user')} />
        <SettingsNavigationDrawerItem
          label={t('profile')}
          path={SettingsPath.ProfilePage}
          Icon={IconUserCircle}
        />
        <SettingsNavigationDrawerItem
          label={t('appearance')}
          path={SettingsPath.Appearance}
          Icon={IconColorSwatch}
        />

        <NavigationDrawerItemGroup>
          <SettingsNavigationDrawerItem
            label={t('accounts')}
            path={SettingsPath.Accounts}
            Icon={IconAt}
          />
          <SettingsNavigationDrawerItem
            level={2}
            label={t('emails')}
            path={SettingsPath.AccountsEmails}
            Icon={IconMail}
            matchSubPages
          />
          <SettingsNavigationDrawerItem
            level={2}
            label={t('calendar')}
            path={SettingsPath.AccountsCalendars}
            Icon={IconCalendarEvent}
            matchSubPages
          />
        </NavigationDrawerItemGroup>
      </NavigationDrawerSection>

      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle label={t('workspace')} />
        <SettingsNavigationDrawerItem
          label={t('general')}
          path={SettingsPath.Workspace}
          Icon={IconSettings}
        />
        <SettingsNavigationDrawerItem
          label={t('members')}
          path={SettingsPath.WorkspaceMembersPage}
          Icon={IconUsers}
        />
        <SettingsNavigationDrawerItem
          label="Roles"
          path={SettingsPath.MembersRoles}
          Icon={IconIdBadge2}
        />
        {billing?.isBillingEnabled && (
          <SettingsNavigationDrawerItem
            label={t('billing')}
            path={SettingsPath.Billing}
            Icon={IconCurrencyDollar}
          />
        )}
        <SettingsNavigationDrawerItem
          label={t('dataModel')}
          path={SettingsPath.Objects}
          Icon={IconHierarchy2}
          matchSubPages
        />
        <SettingsNavigationDrawerItem
          label={t('developers')}
          path={SettingsPath.Developers}
          Icon={IconCode}
        />
        {isFunctionSettingsEnabled && (
          <SettingsNavigationDrawerItem
            label="Functions"
            path={SettingsPath.ServerlessFunctions}
            Icon={IconFunction}
          />
        )}
        <SettingsNavigationDrawerItem
          label={t('integrations')}
          path={SettingsPath.Integrations}
          Icon={IconApps}
        />
        {isCRMMigrationEnabled && (
          <SettingsNavigationDrawerItem
            label="CRM Migration"
            path={SettingsPath.CRMMigration}
            Icon={IconCode}
          />
        )}
      </NavigationDrawerSection>

      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle label={t('other')} />
        <SettingsNavigationDrawerItem
          label={t('releases')}
          path={SettingsPath.Releases}
          Icon={IconRocket}
        />
        <NavigationDrawerItem
          label={t('logout')}
          onClick={signOut}
          Icon={IconDoorEnter}
        />
      </NavigationDrawerSection>
    </>
  );
};
