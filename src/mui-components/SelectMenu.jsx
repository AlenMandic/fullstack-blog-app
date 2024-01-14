import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

export default function BasicSelect({ sorting, setSorting }) {

    const handleChange = (event) => {
      setSorting(event.target.value)
    }

    return (
<Box sx={{ width: 220, color: 'black' }}>
<Typography variant="h5">Sort by: </Typography>
      <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel>{sorting}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          name="simple-select"
          value={sorting}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value={'Default'}>Default</MenuItem>
          <MenuItem value={'Likes'}>Most Liked</MenuItem>
        </Select>
      </FormControl>
    </Box>
    )
  }