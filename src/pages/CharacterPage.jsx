import React, { useState } from 'react';
import Card from '../components/Card';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export default function CharacterPage() {
    const [episodeNumber, setEpisodeNumber] = useState(1);

    const handleInputChange = (e) => {
        setEpisodeNumber(e.target.value);
    };

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
        width: '50%', // Makes the input larger and centered
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
                slotProps={{
                    htmlInput: {
                        min: 1, // Ensuring the episode number stays above 1
                    },
                }}
            />

            {/* Pass the selected episode number to the Card component */}
            <Card episodeNumber={episodeNumber} />
        </div>
    );
}
