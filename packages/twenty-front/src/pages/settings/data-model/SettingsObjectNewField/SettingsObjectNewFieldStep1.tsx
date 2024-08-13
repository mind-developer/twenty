import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { H2Title, IconMinus, IconPlus, IconSettings } from 'twenty-ui';

import { useFieldMetadataItem } from '@/object-metadata/hooks/useFieldMetadataItem';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { isLabelIdentifierField } from '@/object-metadata/utils/isLabelIdentifierField';
import { SaveAndCancelButtons } from '@/settings/components/SaveAndCancelButtons/SaveAndCancelButtons';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import {
  SettingsObjectFieldItemTableRow,
  StyledObjectFieldTableRow,
} from '@/settings/data-model/object-details/components/SettingsObjectFieldItemTableRow';
import { AppPath } from '@/types/AppPath';
import { Button } from '@/ui/input/button/components/Button';
import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Table } from '@/ui/layout/table/components/Table';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableSection } from '@/ui/layout/table/components/TableSection';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useTranslation } from 'react-i18next';

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
`;

const StyledAddCustomFieldButton = styled(Button)`
  align-self: flex-end;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsObjectNewFieldStep1 = () => {
  const navigate = useNavigate();

  const { objectSlug = '' } = useParams();
  const { findActiveObjectMetadataItemBySlug } =
    useFilteredObjectMetadataItems();

  const activeObjectMetadataItem =
    findActiveObjectMetadataItemBySlug(objectSlug);

  const { activateMetadataField, deactivateMetadataField } =
    useFieldMetadataItem();
  const [metadataFields, setMetadataFields] = useState(
    activeObjectMetadataItem?.fields ?? [],
  );

  const activeMetadataFields = metadataFields.filter((field) => field.isActive);
  const deactivatedMetadataFields = metadataFields.filter(
    (field) => !field.isActive,
  );

  const canSave = metadataFields.some(
    (field, index) =>
      field.isActive !== activeObjectMetadataItem?.fields[index].isActive,
  );

  useEffect(() => {
    if (!activeObjectMetadataItem) {
      navigate(AppPath.NotFound);
      return;
    }

    if (!metadataFields.length)
      setMetadataFields(activeObjectMetadataItem.fields);
  }, [activeObjectMetadataItem, metadataFields.length, navigate]);

  if (!activeObjectMetadataItem) return null;

  const handleToggleField = (fieldMetadataId: string) =>
    setMetadataFields((previousFields) =>
      previousFields.map((field) =>
        field.id === fieldMetadataId
          ? { ...field, isActive: !field.isActive }
          : field,
      ),
    );

  const handleSave = async () => {
    await Promise.all(
      metadataFields.map((metadataField, index) => {
        if (
          metadataField.isActive ===
          activeObjectMetadataItem.fields[index].isActive
        ) {
          return undefined;
        }

        return metadataField.isActive
          ? activateMetadataField(metadataField)
          : deactivateMetadataField(metadataField);
      }),
    );

    navigate(`/settings/objects/${objectSlug}`);
  };

  const { t } = useTranslation();
  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <SettingsHeaderContainer>
          <Breadcrumb
            links={[
              { children: t('objects'), href: '/settings/objects' },
              {
                children: activeObjectMetadataItem.labelPlural,
                href: `/settings/objects/${objectSlug}`,
              },
              { children: t('newField') },
            ]}
          />
          {!activeObjectMetadataItem.isRemote && (
            <SaveAndCancelButtons
              isSaveDisabled={!canSave}
              onCancel={() => navigate(`/settings/objects/${objectSlug}`)}
              onSave={handleSave}
            />
          )}
        </SettingsHeaderContainer>
        <StyledSection>
          <H2Title
            title={t('checkDeactivatedFields')}
            description={t('checkDeactivatedFieldsDescription')}
          />
          <Table>
            <StyledObjectFieldTableRow>
              <TableHeader>{t('name')}</TableHeader>
              <TableHeader>{t('fieldType')}</TableHeader>
              <TableHeader>{t('dataType')}</TableHeader>
              <TableHeader></TableHeader>
            </StyledObjectFieldTableRow>
            {!!activeMetadataFields.length && (
              <TableSection isInitiallyExpanded={false} title="Active">
                {activeMetadataFields.map((activeMetadataField) => (
                  <SettingsObjectFieldItemTableRow
                    key={activeMetadataField.id}
                    fieldMetadataItem={activeMetadataField}
                    isRemoteObjectField={activeObjectMetadataItem.isRemote}
                    ActionIcon={
                      isLabelIdentifierField({
                        fieldMetadataItem: activeMetadataField,
                        objectMetadataItem: activeObjectMetadataItem,
                      }) ? undefined : (
                        <LightIconButton
                          Icon={IconMinus}
                          accent="tertiary"
                          onClick={() =>
                            handleToggleField(activeMetadataField.id)
                          }
                        />
                      )
                    }
                  />
                ))}
              </TableSection>
            )}
            {!!deactivatedMetadataFields.length && (
              <TableSection title={t('disabled')}>
                {deactivatedMetadataFields.map((deactivatedMetadataField) => (
                  <SettingsObjectFieldItemTableRow
                    key={deactivatedMetadataField.name}
                    fieldMetadataItem={deactivatedMetadataField}
                    ActionIcon={
                      <LightIconButton
                        Icon={IconPlus}
                        accent="tertiary"
                        onClick={() =>
                          handleToggleField(deactivatedMetadataField.id)
                        }
                      />
                    }
                  />
                ))}
              </TableSection>
            )}
          </Table>
          <StyledAddCustomFieldButton
            Icon={IconPlus}
            title={t('addCustomField')}
            size="small"
            variant="secondary"
            to={`/settings/objects/${objectSlug}/new-field/step-2`}
          />
        </StyledSection>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
