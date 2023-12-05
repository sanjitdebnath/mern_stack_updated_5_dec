import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ColorAlerts({status,message,color}) {
  return (
    <Alert severity={status} color={color}>
      {message}
    </Alert>
  );
}