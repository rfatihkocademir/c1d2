// src/utils/getInitials.js

const getInitials = (name) => {
    if (typeof name !== 'string') {
      throw new Error('Invalid name');
    }
    const words = name.trim().split(' ');
    const initials = words.length > 1
      ? `${words[0][0]}${words[1][0]}`
      : words[0][0];
    return initials.toUpperCase();
  };
  
  export default getInitials;