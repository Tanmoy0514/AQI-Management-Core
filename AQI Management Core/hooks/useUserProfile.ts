import { useState } from 'react';

export const useUserProfile = () => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [institutionName, setInstitutionName] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['none']);
  const [loading, setLoading] = useState(false);

  const handleConditionToggle = (id: string) => {
    if (id === 'none') {
      setSelectedConditions(['none']);
      return;
    }
    const newConditions = selectedConditions.filter(c => c !== 'none');
    if (selectedConditions.includes(id)) {
      setSelectedConditions(newConditions.filter(c => c !== id));
    } else {
      setSelectedConditions([...newConditions, id]);
    }
  };

  return {
    userName, setUserName,
    userAge, setUserAge,
    userRole, setUserRole,
    institutionName, setInstitutionName,
    selectedConditions, handleConditionToggle,
    loading, setLoading
  };
};