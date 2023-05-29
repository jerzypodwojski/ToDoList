import React, { useState } from 'react';

export default function EditTask({ toggleCompletedTasks }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleCompletedTasks();
  };

  return (
    <div>
      <input
        type="checkbox"
        id="toggleCheckbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="toggleCheckbox">Hide completed</label>
    </div>
  );
}