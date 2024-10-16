import { render, screen } from '@testing-library/vue';
import AppNavbar from '../src/components/AppNavbar.vue';
import { describe, it, expect } from 'vitest';

describe('AppNavbar', () => {
  it('renders navbar with correct links', () => {
    render(AppNavbar);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Working Times')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Clock')).toBeInTheDocument();
  });
});