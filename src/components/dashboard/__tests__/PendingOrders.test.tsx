import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PendingOrders from '../PendingOrders';

const mockOrders: any[] = [
    {
        id: '1',
        customerName: 'Test User',
        items: [{ name: 'Burger', quantity: 2 }],
        amount: 150,
        status: 'PENDING',
        createdAt: new Date().toISOString()
    }
];

describe('PendingOrders Component', () => {
    it('renders correctly with orders', () => {
        const { getByText } = render(
            <PendingOrders
                orders={mockOrders}
                onAccept={() => { }}
                onReject={() => { }}
            />
        );

        expect(getByText('Pending Orders (1)')).toBeTruthy();
        expect(getByText('Test User')).toBeTruthy();
        expect(getByText('₹150')).toBeTruthy();
    });

    it('calls onAccept when Accept button is pressed', () => {
        const onAcceptMock = jest.fn();
        const { getByText } = render(
            <PendingOrders
                orders={mockOrders}
                onAccept={onAcceptMock}
                onReject={() => { }}
            />
        );

        const acceptButton = getByText('Accept');
        fireEvent.press(acceptButton);

        expect(onAcceptMock).toHaveBeenCalledWith('1');
    });
});
