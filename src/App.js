// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Grid, Card, CardContent, Typography, CircularProgress, Box, Pagination, TextField, CardMedia } from '@mui/material';

// const App = () => {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [totalPages, setTotalPages] = useState(0);

//   // Fetch Pokémon list from the API
//   useEffect(() => {
//     setLoading(true);
//     axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`)
//       .then(response => {
//         const pokemonUrls = response.data.results.map(pokemon => pokemon.url);

//         // Fetch individual Pokémon details including their images
//         Promise.all(pokemonUrls.map(url => axios.get(url)))
//           .then(pokemonDetails => {
//             const formattedData = pokemonDetails.map(pokemon => ({
//               name: pokemon.data.name,
//               image: pokemon.data.sprites.front_default
//             }));
//             setPokemonData(formattedData);
//             setTotalPages(Math.ceil(response.data.count / 20));
//             setLoading(false);
//           })
//           .catch(error => {
//             setError('Failed to fetch Pokémon details');
//             setLoading(false);
//           });
//       })
//       .catch(error => {
//         setError('Failed to fetch Pokémon list');
//         setLoading(false);
//       });
//   }, [page]);

//   const handleSearch = (e) => {
//     setSearch(e.target.value.toLowerCase());
//   };

//   const filteredData = pokemonData.filter(pokemon => pokemon.name.includes(search));

//   return (
//     <Container>
//       <Box mt={4} mb={2}>
//         <TextField 
//           label="Search Pokémon" 
//           variant="outlined" 
//           fullWidth
//           onChange={handleSearch}
//         />
//       </Box>
      
//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <>
//           <Grid container spacing={3}>
//             {filteredData.map(pokemon => (
//               <Grid item xs={12} sm={6} md={4} key={pokemon.name}>
//                 <Card>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={pokemon.image} // Display Pokémon image here
//                     alt={pokemon.name}
//                     style={{
//                       objectFit: 'cover', // Ensures the image covers the whole card area
//                       width: '100%',      // Ensures the image takes the full width of the card
//                       height: '100%',     // Ensures the image takes the full height of the card
//                     }}
//                   />
//                   <CardContent>
//                     <Typography variant="h6">{pokemon.name}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Box display="flex" justifyContent="center" mt={3}>
//             <Pagination 
//               count={totalPages} 
//               page={page} 
//               onChange={(e, value) => setPage(value)} 
//             />
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Box, Pagination, TextField, CardMedia } from '@mui/material';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  // Fetch Pokémon list from the API
  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`)
      .then(response => {
        const pokemonUrls = response.data.results.map(pokemon => pokemon.url);

        // Fetch individual Pokémon details including their images
        Promise.all(pokemonUrls.map(url => axios.get(url)))
          .then(pokemonDetails => {
            const formattedData = pokemonDetails.map(pokemon => ({
              name: pokemon.data.name,
              image: pokemon.data.sprites.front_default
            }));
            setPokemonData(formattedData);
            setTotalPages(Math.ceil(response.data.count / 20));
            setLoading(false);
          })
          .catch(error => {
            setError('Failed to fetch Pokémon details');
            setLoading(false);
          });
      })
      .catch(error => {
        setError('Failed to fetch Pokémon list');
        setLoading(false);
      });
  }, [page]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredData = pokemonData.filter(pokemon => pokemon.name.includes(search));

  return (
    <Container>
      <Box mt={4} mb={2}>
        <TextField 
          label="Search Pokémon" 
          variant="outlined" 
          fullWidth
          onChange={handleSearch}
        />
      </Box>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredData.map(pokemon => (
              <Grid item xs={12} sm={6} md={3} key={pokemon.name}> {/* Changed md={4} to md={3} */}
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={pokemon.image} // Display Pokémon image here
                    alt={pokemon.name}
                    style={{
                      objectFit: 'cover', // Ensures the image covers the whole card area
                      width: '100%',      // Ensures the image takes the full width of the card
                      height: '100%',     // Ensures the image takes the full height of the card
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{pokemon.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={(e, value) => setPage(value)} 
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default App;
