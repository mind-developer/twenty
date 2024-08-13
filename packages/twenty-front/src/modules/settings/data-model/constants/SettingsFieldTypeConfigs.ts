import {
  IconCalendarEvent,
  IconCalendarTime,
  IconCheck,
  IconCoins,
  IconComponent,
  IconJson,
  IconKey,
  IconLink,
  IconMail,
  IconMap,
  IconNumbers,
  IconPhone,
  IconRelationManyToMany,
  IconTag,
  IconTags,
  IconTextSize,
  IconTwentyStar,
  IconUser,
} from 'twenty-ui';

import { CurrencyCode } from '@/object-record/record-field/types/CurrencyCode';
import { DEFAULT_DATE_VALUE } from '@/settings/data-model/constants/DefaultDateValue';
import { SettingsSupportedFieldType } from '@/settings/data-model/types/SettingsSupportedFieldType';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import i18n from '~/utils/i18n/index';

DEFAULT_DATE_VALUE.setFullYear(DEFAULT_DATE_VALUE.getFullYear() + 2);

export type SettingsFieldTypeConfig = {
  label: string;
  Icon: IconComponent;
  defaultValue?: unknown;
};

export const SETTINGS_FIELD_TYPE_CONFIGS = {
  [FieldMetadataType.Uuid]: {
    label: i18n.t('uuid'),
    Icon: IconKey,
    defaultValue: '00000000-0000-0000-0000-000000000000',
  },
  [FieldMetadataType.Text]: {
    label: i18n.t('text'),
    Icon: IconTextSize,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum magna enim, dapibus non enim in, lacinia faucibus nunc. Sed interdum ante sed felis facilisis, eget ultricies neque molestie. Mauris auctor, justo eu volutpat cursus, libero erat tempus nulla, non sodales lorem lacus a est.',
  },
  [FieldMetadataType.Numeric]: {
    label: i18n.t('numeric'),
    Icon: IconNumbers,
    defaultValue: 2000,
  },
  [FieldMetadataType.Number]: {
    label: i18n.t('number'),
    Icon: IconNumbers,
    defaultValue: 2000,
  },
  [FieldMetadataType.Link]: {
    label: i18n.t('link'),
    Icon: IconLink,
    defaultValue: { url: 'www.twenty.com', label: '' },
  },
  [FieldMetadataType.Links]: {
    label: i18n.t('links'),
    Icon: IconLink,
    defaultValue: { primaryLinkUrl: 'twenty.com', primaryLinkLabel: '' },
  },
  [FieldMetadataType.Boolean]: {
    label: i18n.t('trueFalse'),
    Icon: IconCheck,
    defaultValue: true,
  },
  [FieldMetadataType.DateTime]: {
    label: i18n.t('dateTime'),
    Icon: IconCalendarTime,
    defaultValue: DEFAULT_DATE_VALUE.toISOString(),
  },
  [FieldMetadataType.Date]: {
    label: i18n.t('date'),
    Icon: IconCalendarEvent,
    defaultValue: DEFAULT_DATE_VALUE.toISOString(),
  },
  [FieldMetadataType.Select]: {
    label: i18n.t('select'),
    Icon: IconTag,
  },
  [FieldMetadataType.MultiSelect]: {
    label: i18n.t('multiSelect'),
    Icon: IconTags,
  },
  [FieldMetadataType.Currency]: {
    label: i18n.t('currency'),
    Icon: IconCoins,
    defaultValue: { amountMicros: 2000000000, currencyCode: CurrencyCode.USD },
  },
  [FieldMetadataType.Relation]: {
    label: i18n.t('relation'),
    Icon: IconRelationManyToMany,
  },
  [FieldMetadataType.Email]: { label: 'Email', Icon: IconMail },
  [FieldMetadataType.Phone]: {
    label: i18n.t('phone'),
    Icon: IconPhone,
    defaultValue: '+1234-567-890',
  },
  [FieldMetadataType.Rating]: {
    label: i18n.t('rating'),
    Icon: IconTwentyStar,
    defaultValue: '3',
  },
  [FieldMetadataType.FullName]: {
    label: i18n.t('fullName'),
    Icon: IconUser,
    defaultValue: { firstName: 'John', lastName: 'Doe' },
  },
  [FieldMetadataType.Address]: {
    label: i18n.t('address'),
    Icon: IconMap,
    defaultValue: {
      addressStreet1: '456 Oak Street',
      addressStreet2: 'Unit 3B',
      addressCity: 'Springfield',
      addressState: 'California',
      addressCountry: 'United States',
      addressPostcode: '90210',
      addressLat: 34.0522,
      addressLng: -118.2437,
    },
  },
  [FieldMetadataType.RawJson]: {
    label: i18n.t('json'),
    Icon: IconJson,
    defaultValue: { key: 'value' },
  },
} as const satisfies Record<
  SettingsSupportedFieldType,
  SettingsFieldTypeConfig
>;
