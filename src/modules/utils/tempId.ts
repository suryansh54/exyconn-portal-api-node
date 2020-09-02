const tempID = (tempIDLength: number = 10) => { // 6 Digit tempID generate
  const digits = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 1; i <= tempIDLength; i++) {
    const index = Math.floor(Math.random() * (digits.length));
    id = id + digits[index];
  }
  return id;
};

export default tempID;
