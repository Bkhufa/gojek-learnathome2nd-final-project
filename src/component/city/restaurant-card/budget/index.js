import React from 'react';
import Chip from '@material-ui/core/Chip';

import styles from '../card.module.css'

const Budget = ({ budget, className }) => {
    const budgets = [...Array(budget)];
    return (
        <Chip 
            variant="outlined"
            color="secondary"
            className={className}
            label={budgets.map((_, idx) => (
                <span key={idx} className={styles.goldenColor}>$</span>
            ))}
        />

    );
};

export default Budget;