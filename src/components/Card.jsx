import React, { useState, useEffect } from 'react';
import { Card as MuiCard, CardContent, CardMedia, Typography, Box } from '@mui/material';

export default function Card({ episodeNumber }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            if (!episodeNumber) {
                setCharacters([]); // Clear characters if input is cleared
                return;
            }
            setLoading(true);
            setError(null);

            try {
                // Fetch the episode data
                const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeNumber}`);
                if (!response.ok) {
                    throw new Error(`Error fetching episode ${episodeNumber}: ${response.statusText}`);
                }
                const episodeData = await response.json();

                // Fetch each character's data
                const characterUrls = episodeData.characters;
                const characterPromises = characterUrls.map((url) => fetch(url).then((res) => {
                    if (!res.ok) {
                        throw new Error(`Error fetching character: ${res.statusText}`);
                    }
                    return res.json();
                }));

                const characterData = await Promise.all(characterPromises);
                setCharacters(characterData);
            } catch (err) {
                console.error(err); // Log the error to the console for debugging
                setError(err.message); // Set the error message for display
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [episodeNumber]);

    return (
        <div>
            {loading ? (
                <Typography variant="h5" align="center">Loading...</Typography>
            ) : error ? (
                <Typography variant="h6" color="error" align="center">{error}</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    {characters.map((character) => (
                        <MuiCard key={character.id} sx={{ width: 300 }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={character.image}
                                alt={character.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div" align="center">
                                    {character.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Status: {character.status}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Species: {character.species}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Gender: {character.gender}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Origin: {character.origin.name}
                                </Typography>
                            </CardContent>
                        </MuiCard>
                    ))}
                </Box>
            )}
        </div>
    );
}
