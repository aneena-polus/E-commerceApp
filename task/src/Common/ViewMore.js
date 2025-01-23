import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';

function ViewMore(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {isExpanded || props.text.length <= props.maxLength
                ? props.text + ' '
                : `${props.text.slice(0, props.maxLength)} `}
            {props.text.length > props.maxLength && (
                <Link href="#" underline="none" onClick={toggleExpanded} style={{ color: grey[700], fontSize: 14 }}>
                    {isExpanded ? 'less' : '...more'}
                </Link>
            )}
        </>
    );
}

export default ViewMore;
