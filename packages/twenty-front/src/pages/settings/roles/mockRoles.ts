export type RoleItem = {
  namePlural: string;
  labelPlural: string;
  isCustom: boolean;
  isRemote: boolean;
  description: string;
  icon: string;
};

export const mockRoleItems = {
  active: [
    {
      namePlural: 'Manager',
      labelPlural: 'Admin',
      isCustom: false,
      isRemote: false,
    },
    {
      namePlural: 'Support',
      labelPlural: 'Support',
      isCustom: false,
      isRemote: false,
    },
    {
      namePlural: 'Sales',
      labelPlural: 'Sales',
      isCustom: false,
      isRemote: false,
    },
    {
      namePlural: 'Finance',
      labelPlural: 'Finance',
      isCustom: true,
      isRemote: false,
    },
  ],
  deactive: [
    {
      namePlural: 'Teste',
      labelPlural: 'Finance',
      isCustom: true,
      isRemote: false,
    },
  ],
};
