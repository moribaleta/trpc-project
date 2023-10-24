const generateId = () => (Math.random() + 1).toString(36).substring(7);

export default generateId;
