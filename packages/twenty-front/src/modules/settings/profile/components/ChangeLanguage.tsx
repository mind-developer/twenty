import { Select } from '@/ui/input/components/Select';
import { useEffect, useState } from 'react';

// TO DO: change how language data is used
export const ChangeLanguage = () => {
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
    localStorage.setItem('language', value);
  };

  return (
    <Select
      dropdownId="profile-language"
      options={[
        { label: 'English', value: 'en' },
        { label: 'Portuguese', value: 'pt' },
      ]}
      value={selectedLanguage}
      onChange={handleLanguageChange}
    />
  );
};
