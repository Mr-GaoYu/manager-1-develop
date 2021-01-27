import React from 'react';
import Grid from 'src/components/core/Grid';
import { MockData, mockDataController } from './mockDataController';
import ServiceWorkerTool from './ServiceWorkerTool';

const options: { label: string; key: keyof MockData }[] = [
  { label: 'Domains', key: 'domain' }
];

const MockDataTool: React.FC<{}> = () => {
  const [localMockData, setLocalMockData] = React.useState<MockData>(
    mockDataController.mockData
  );

  const handleInputChange = (key: keyof MockData, quantity: number) => {
    const newMockData: MockData = { [key]: { mocked: true, quantity } };
    mockDataController.updateMockData(newMockData);
  };

  React.useEffect(() => {
    const token = mockDataController.subscribe((newMockData) => {
      setLocalMockData(newMockData);
    });
    return () => mockDataController.unsubscribe(token);
  }, []);

  return (
    <Grid>
      <Grid item xs={12}>
        <h4 style={{ marginBottom: 8 }}>Mock Data</h4>
      </Grid>
      <Grid item xs={12}>
        {options.map((thisOption) => {
          return (
            <div key={thisOption.key} style={{ marginTop: 4 }}>
              <label style={{ marginRight: 4 }}>{thisOption.label}: </label>
              <input
                type="number"
                min="0"
                onChange={(e) =>
                  handleInputChange(thisOption.key, Number(e.target.value))
                }
                value={localMockData[thisOption.key]?.quantity ?? 0}
              />
            </div>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <ServiceWorkerTool />
      </Grid>
    </Grid>
  );
};

export default React.memo(MockDataTool);
