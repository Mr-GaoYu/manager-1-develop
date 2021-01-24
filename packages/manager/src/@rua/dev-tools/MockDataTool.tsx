import React from 'react';
import Grid from 'src/components/core/Grid';

const MockDataTool: React.FC = () => {
  return (
    <Grid>
      <Grid item xs={12}>
        <h4 style={{ marginBottom: 8 }}>Mock Data</h4>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default React.memo(MockDataTool);
