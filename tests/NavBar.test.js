// src/components/AppNavbar.test.js
import { render, fireEvent } from '@testing-library/vue';
import AppNavbar from './AppNavbar.vue';
import { signOut } from 'firebase/auth';

// Mocker l'importation de firebase pour éviter les appels réels
jest.mock('./firebase', () => ({
  auth: {
    currentUser: { uid: 'testUser' }, // Simule un utilisateur connecté
    onAuthStateChanged: jest.fn((callback) => callback({ uid: 'testUser' })), // Simule un changement d'état d'authentification
  },
}));

// Mocker la fonction signOut
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(() => Promise.resolve()), // Simule une déconnexion réussie
}));

describe('AppNavbar.vue', () => {
  it('renders the navbar when user is authenticated', () => {
    const { getByText } = render(AppNavbar);

    // Vérifie que le titre et les liens sont présents
    expect(getByText('GOTHtime')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Working Times')).toBeInTheDocument();
    expect(getByText('Teams')).toBeInTheDocument();
    expect(getByText('User Profile')).toBeInTheDocument();
    expect(getByText('Clock')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout when the button is clicked', async () => {
    const { getByText } = render(AppNavbar);

    const logoutButton = getByText('Logout');

    // Simule un clic sur le bouton de déconnexion
    await fireEvent.click(logoutButton);

    // Vérifie que la fonction signOut a été appelée
    expect(signOut).toHaveBeenCalled();
  });
});