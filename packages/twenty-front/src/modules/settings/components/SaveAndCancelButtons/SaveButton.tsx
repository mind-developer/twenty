import { IconDeviceFloppy } from 'twenty-ui';

import { Button } from '@/ui/input/button/components/Button';
import { useTranslation } from 'react-i18next';

type SaveButtonProps = {
  onSave?: () => void;
  disabled?: boolean;
};

export const SaveButton = ({ onSave, disabled }: SaveButtonProps) => {
  const { t } = useTranslation(); 
  return (
    <Button
      title={t('saveButton')}
      variant="primary"
      size="small"
      accent="blue"
      disabled={disabled}
      onClick={onSave}
      Icon={IconDeviceFloppy}
    />
  );
};
