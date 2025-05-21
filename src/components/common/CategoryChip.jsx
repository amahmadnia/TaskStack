// src/components/common/CategoryChip.js
import React from 'react';
import { Chip } from '@mui/material';

const CategoryChip = ({ category, onClick, onDelete }) => {
  if (!category) return null;
  
  return (
    <Chip
      label={category.name}
      sx={{
        backgroundColor: category.color,
        color: '#fff',
        '&:hover': {
          backgroundColor: category.color,
          opacity: 0.9,
        },
      }}
      onClick={onClick ? () => onClick(category) : undefined}
      onDelete={onDelete ? () => onDelete(category) : undefined}
    />
  );
};

export default CategoryChip;