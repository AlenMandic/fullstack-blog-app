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
<Box sx={{ width: 220, color: 'white' }}>
<Typography variant="h5">Sort by: </Typography>
      <FormControl fullWidth sx={{ my: 2 }}>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          name="simple-select"
          value={sorting}
          label="Sort by"
          onChange={handleChange}
          sx={{ backgroundColor: 'white' }}
        >
          <MenuItem value={'default'}>Default</MenuItem>
          <MenuItem value={'likes'}>Most Liked</MenuItem>
        </Select>
      </FormControl>
    </Box>
    )
  }