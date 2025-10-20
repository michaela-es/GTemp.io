import React from 'react';

export const CategoryGenreField = ({ value = { category: '', genre: '' }, onChange }) => {
  // Based on your data.json structure
  const categories = ['Environment', 'Character', 'UI', 'Audio', 'System'];
  const genres = ['Educational', 'Sci-Fi', 'Fantasy', 'Action', 'RPG'];

  // Ensure value is always an object with the expected properties
  const safeValue = {
    category: value?.category || '',
    genre: value?.genre || ''
  };

  const handleChange = (field, fieldValue) => {
    onChange({
      ...safeValue,
      [field]: fieldValue
    });
  };

  return (
    <div className="form-field">
      <label>Category & Genre *</label>
      <div className="category-genre-fields">
        <select 
          value={safeValue.category} 
          onChange={(e) => handleChange('category', e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <select 
          value={safeValue.genre} 
          onChange={(e) => handleChange('genre', e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select Genre</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
    </div>
  );
};