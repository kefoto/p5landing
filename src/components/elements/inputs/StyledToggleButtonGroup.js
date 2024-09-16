

import * as React from 'react';
import styled from 'styled-components';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  display: flex;
  border: 1px solid #e0e0e0;
  flex-wrap: wrap;

  .MuiToggleButtonGroup-grouped {
    margin: 4px;
    border: none;
    border-radius: 4px;
  }

  .MuiToggleButtonGroup-grouped.Mui-disabled {
    border: none;
  }

  .MuiToggleButtonGroup-grouped:not(:first-of-type) {
    margin-left: -1px;
    border-left: 1px solid transparent;
  }
`;


export default StyledToggleButtonGroup;
