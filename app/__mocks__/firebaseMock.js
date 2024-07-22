//mock firebase auth functions
const firebaseAuthMock = {
    signInWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),
    initializeAuth: jest.fn(),
    auth: {
      currentUser: {
          uid: '123456',
          email: 'sheep@email.com',
          username: 'sheep'
    }},
};

//mock firebase firestore functions
const firebaseFirestoreMock = {
  setDoc: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(() => ({
    docs: [],
  })),
  getDoc: jest.fn(() => ({
      data: jest.fn(() => ({
          uid: '123456',
          email: 'sheep@email.com',
          username: 'sheep'
      })),
  })),
  getFirestore: jest.fn(() => ({})),
};

module.exports = {
  ...firebaseAuthMock,
  ...firebaseFirestoreMock,
};