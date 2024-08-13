import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { objectMetadataItemSchema } from '@/object-metadata/validation-schemas/objectMetadataItemSchema';
import { OBJECT_NAME_MAXIMUM_LENGTH } from '@/settings/data-model/constants/ObjectNameMaximumLength';
import { IconPicker } from '@/ui/input/components/IconPicker';
import { TextArea } from '@/ui/input/components/TextArea';
import { TextInput } from '@/ui/input/components/TextInput';
import { useTranslation } from 'react-i18next';

export const settingsDataModelObjectAboutFormSchema =
  objectMetadataItemSchema.pick({
    description: true,
    icon: true,
    labelPlural: true,
    labelSingular: true,
  });

type SettingsDataModelObjectAboutFormValues = z.infer<
  typeof settingsDataModelObjectAboutFormSchema
>;

type SettingsDataModelObjectAboutFormProps = {
  disabled?: boolean;
  disableNameEdit?: boolean;
  objectMetadataItem?: ObjectMetadataItem;
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

export const SettingsDataModelObjectAboutForm = ({
  disabled,
  disableNameEdit,
  objectMetadataItem,
}: SettingsDataModelObjectAboutFormProps) => {
  const { control } = useFormContext<SettingsDataModelObjectAboutFormValues>();

  const { t } = useTranslation();
  return (
    <>
      <StyledInputsContainer>
        <StyledInputContainer>
          <StyledLabel>{t('icon')}</StyledLabel>
          <Controller
            name="icon"
            control={control}
            defaultValue={objectMetadataItem?.icon ?? 'IconListNumbers'}
            render={({ field: { onChange, value } }) => (
              <IconPicker
                disabled={disabled}
                selectedIconKey={value}
                onChange={({ iconKey }) => onChange(iconKey)}
              />
            )}
          />
        </StyledInputContainer>
        {[
          {
            label: t('singular'),
            fieldName: 'labelSingular' as const,
            placeholder: t('listing'),
            defaultValue: objectMetadataItem?.labelSingular,
          },
          {
            label: t('plural'),
            fieldName: 'labelPlural' as const,
            placeholder: t('listings'),
            defaultValue: objectMetadataItem?.labelPlural,
          },
        ].map(({ defaultValue, fieldName, label, placeholder }) => (
          <Controller
            key={`object-${fieldName}-text-input`}
            name={fieldName}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled || disableNameEdit}
                fullWidth
                maxLength={OBJECT_NAME_MAXIMUM_LENGTH}
              />
            )}
          />
        ))}
      </StyledInputsContainer>
      <Controller
        name="description"
        control={control}
        defaultValue={objectMetadataItem?.description ?? null}
        render={({ field: { onChange, value } }) => (
          <TextArea
            placeholder={t('writeDescription')}
            minRows={4}
            value={value ?? undefined}
            onChange={(nextValue) => onChange(nextValue ?? null)}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};
