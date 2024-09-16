import * as React from "react";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  display: flex;
  border: 1px solid #000;
  flex-wrap: wrap;
  border-radius: 2rem;

  .MuiToggleButtonGroup-grouped {
    margin: 0.125rem 0.25rem;
    border: none;
    border-radius: 2rem;
    width: 2rem;
    height: 1.5rem;
    font-size: 0.7rem;
  }

  .MuiToggleButtonGroup-grouped.Mui-disabled {
    border: none;
  }

  // .MuiToggleButtonGroup-grouped:not(:first-of-type) {
  //   margin-left: -2px;
  //   border-left: 2px solid transparent;
  // }
`;

export default StyledToggleButtonGroup;
