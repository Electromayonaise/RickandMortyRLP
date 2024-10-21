import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/Card';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export default function CharacterPage() {
    const [episodeNumber, setEpisodeNumber] = useState(1);
    const inputRef = useRef(null); // Reference to the TextField

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEpisodeNumber(value);
    };

    // Set focus on the TextField when the page loads
    useEffect(() => {
        inputRef.current.focus(); // Focus on the TextField on every change
    }, [episodeNumber]); // Run this effect whenever episodeNumber changes
    

    // Custom-styled TextField
    const CustomTextField = styled(TextField)({
        '& .MuiInputBase-root': {
            fontSize: '2rem',
            color: '#66bb6a',
        },
        '& .MuiInputLabel-root': {
            color: '#66bb6a',
            fontSize: '2rem',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#66bb6a',
            },
            '&:hover fieldset': {
                borderColor: '#43a047',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2e7d32',
            },
        },
        marginBottom: '30px',
        width: '50%',
    });

    return (
        <div>
            <h1 style={{ fontFamily: 'Get Schwifty, sans-serif' }}>Character Information by Episode</h1>

            {/* Custom styled TextField */}
            <CustomTextField
                label="Enter Episode Number"
                type="number"
                value={episodeNumber}
                onChange={handleInputChange}
                inputRef={inputRef} // ref attribute to focus on the TextField
                slotProps={{
                    htmlInput: {
                        min: 1, // Minimum value allowed
                    },
                }}
            />

            {/* Pass the selected episode number to the Card component */}
            <Card episodeNumber={episodeNumber} />
        </div>
    );
}
