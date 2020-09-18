import React from 'react';
import Chip from '@material-ui/core/Chip';

const Budget = ({ budget, className }) => {
    const budgets = [...Array(budget)];
    return (
        <Chip
            className={className}
            label={budgets.map((_, idx) => (
                <span key={idx}>$</span>
            ))}
        />

    );
};

export default Budget;