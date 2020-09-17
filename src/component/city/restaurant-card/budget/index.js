import React from 'react';

const Budget = ({ budget }) => {
    const budgets = [...Array(budget)];
    return (
        budgets.map((_, idx) => (
            <span key={idx}>$</span>
        ))
    );
};

export default Budget;