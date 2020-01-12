import React from 'react';

import {
  Box,
  Heading,
  TextInput,
  Button,
  Grommet,
  ResponsiveContext,
} from 'grommet';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

export default props => {
  return (
    <Grommet theme={theme} full>
      <Box
        fill
        direction="column"
        background="brand"
        align="center"
        justify="center">
        <Box
        >
          <Heading margin="none"> Vehicule checker </Heading>
          <TextInput
            id="text-input"
            placeholder="placeholder"
            value="Some value"
          />
        </Box>
      </Box>
    </Grommet>
  );
};
