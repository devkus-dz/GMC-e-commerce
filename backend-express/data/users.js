import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123',
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '123',
    isAdmin: false,
  },
  {
    name: 'Fatiha Lopez',
    email: 'fatchi@example.com',
    password: '123',
    isAdmin: false,
  },
];

export default users;