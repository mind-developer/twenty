import { Select } from '@/ui/input/components/Select';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// TO DO: change how language data is used
export const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'pt'>('en');

  // Used to test the functionality of the language switcher
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'pt') {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (value: 'en' | 'pt') => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
    window.location.reload();
  };


  return (
    <Select
      dropdownId="profile-language"
      options={[
        { label: t('english'), value: 'en' },
        { label: t('portuguese'), value: 'pt' },
      ]}
      value={selectedLanguage}
      onChange={handleLanguageChange}
    />
  );
};
