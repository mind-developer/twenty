/* ========================== 
 Mock data for screen test, db required to continue
========================== */
import styled from '@emotion/styled';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { H2Title } from 'twenty-ui';
import { z } from 'zod';

import { OBJECT_NAME_MAXIMUM_LENGTH } from '@/settings/data-model/constants/ObjectNameMaximumLength';
import { SettingsRolePermissionsTable } from '@/settings/roles/forms/components/SettingsRolePermissionsTable';
import { IconPicker } from '@/ui/input/components/IconPicker';
import { Radio } from '@/ui/input/components/Radio';
import { RadioGroup } from '@/ui/input/components/RadioGroup';
import { Select } from '@/ui/input/components/Select';
import { TextArea } from '@/ui/input/components/TextArea';
import { TextInput } from '@/ui/input/components/TextInput';
import { Section } from '@/ui/layout/section/components/Section';
import { RoleItem } from '~/pages/settings/roles/useMockRoles';

const roleMetadataFormSchema = z.object({
  icon: z.string(),
  name: z.string().min(3, 'Name is required'),
  description: z.string().optional(),
  isCustom: z.boolean().default(true),
  isRemote: z.boolean().default(false),
  archived: z.boolean().default(false),
  usersId: z.number().default(0),
});

export const SettingsRoleFormSchema = roleMetadataFormSchema.pick({
  icon: true,
  name: true,
  description: true,
  isCustom: true,
  isRemote: true,
  archived: true,
  usersId: true,
});

type SettingsRoleFormSchemaValues = z.infer<typeof SettingsRoleFormSchema>;

type SettingsRoleAboutFormProps = {
  disabled?: boolean;
  disableNameEdit?: boolean;
  roleItem?: RoleItem;
};

const StyledInputsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

const StyledLabel = styled.span`
  color: ${({ theme }) => theme.font.color.light};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const SettingsRoleAboutForm = ({
  disabled,
  disableNameEdit,
  roleItem,
}: SettingsRoleAboutFormProps) => {
  const { control } = useFormContext<SettingsRoleFormSchemaValues>();

  const [selectedReportRole, setSelectedReportRole] = useState('');
  const [assignRecord, setAssignRecord] = useState('');
  const [accessWorkspace, setAccessWorkspace] = useState('');
  const [copyPermissions, setCopyPermissions] = useState('');

  const handleSelectReportRole = (value: string) => {
    setSelectedReportRole(value);
  };

  const handleSelectCopyPermissions = (value: string) => {
    setCopyPermissions(value);
  };

  return (
    <>
      <Section>
        <H2Title title="About" />
        <StyledInputsContainer>
          <StyledInputContainer>
            <StyledLabel>Icon</StyledLabel>
            <Controller
              name="icon"
              control={control}
              defaultValue={roleItem?.icon ?? 'IconListNumbers'}
              render={({ field: { onChange, value } }) => (
                <IconPicker
                  disabled={disabled}
                  selectedIconKey={value}
                  onChange={({ iconKey }) => onChange(iconKey)}
                />
              )}
            />
          </StyledInputContainer>
          <Controller
            key={`role-name-text-input`}
            name={'name' as const}
            control={control}
            defaultValue={roleItem?.name}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={'Name'}
                placeholder={'Enter the role name'}
                value={value}
                onChange={onChange}
                disabled={disabled || disableNameEdit}
                fullWidth
                maxLength={OBJECT_NAME_MAXIMUM_LENGTH}
              />
            )}
          />
        </StyledInputsContainer>
        <Controller
          name="description"
          control={control}
          defaultValue={roleItem?.description}
          render={({ field: { onChange, value } }) => (
            <TextArea
              placeholder="Write a description"
              minRows={1}
              value={value ?? undefined}
              onChange={(nextValue) => onChange(nextValue ?? null)}
              disabled={disabled}
            />
          )}
        />
      </Section>
      <Section>
        <H2Title title="New role settings" />
        <Select
          dropdownId="report-role"
          label="Reports to"
          options={[
            {
              label: 'Select the responsible role',
              value: '',
            },
            { label: 'Manager', value: 'manager' },
            { label: 'Support', value: 'support' },
            { label: 'Sale', value: 'sale' },
            { label: 'Finance', value: 'finance' },
          ]}
          value={selectedReportRole}
          onChange={handleSelectReportRole}
        />
      </Section>
      <StyledSection>
        <StyledLabel>Can assign records to</StyledLabel>
        <RadioGroup
          onValueChange={(value) => setAssignRecord(value)}
          value={assignRecord}
        >
          <Radio
            name="assignRecordsGroup"
            label="All members"
            value="allmembers"
            onChange={(e) => setAssignRecord(e.target.value)}
          />
          <Radio
            name="assignRecordsGroup"
            label="Members of the same level"
            value="sameLevelMembers"
            onChange={(e) => setAssignRecord(e.target.value)}
          />
          <Radio
            name="assignRecordsGroup"
            label="Direct subordinate members"
            value="directSubordinate"
            onChange={(e) => setAssignRecord(e.target.value)}
          />
        </RadioGroup>
      </StyledSection>
      <StyledSection>
        <StyledLabel>Can access workspace settings?</StyledLabel>
        <RadioGroup
          onValueChange={(value) => setAccessWorkspace(value)}
          value={accessWorkspace}
        >
          <Radio
            name="accessWorkspaceGroup"
            label="Yes"
            value="yes"
            onChange={(e) => setAccessWorkspace(e.target.value)}
          />
          <Radio
            name="accessWorkspaceGroup"
            label="No"
            value="no"
            onChange={(e) => setAccessWorkspace(e.target.value)}
          />
        </RadioGroup>
      </StyledSection>
      <Section>
        <Select
          dropdownId="copy-permissions"
          label="Copy permissions"
          options={[
            {
              label: 'Select which role you want to copy from',
              value: '',
            },
            { label: 'Manager', value: 'manager' },
            { label: 'Support', value: 'support' },
            { label: 'Sale', value: 'sale' },
            { label: 'Finance', value: 'finance' },
          ]}
          value={copyPermissions}
          onChange={handleSelectCopyPermissions}
        />
      </Section>
      <Section>
        <H2Title title="Permissions" />
        <SettingsRolePermissionsTable />
      </Section>
    </>
  );
};
