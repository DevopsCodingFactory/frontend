import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';
import '@testing-library/jest-dom';

describe('Page', () => {
    it('welcome message', () => {
        render(<Page />)
        const welcomeMessage = screen.getByText(/POKEMON GENERATOR/i);
        expect(welcomeMessage).toBeInTheDocument()
    })
})