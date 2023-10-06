import * as React from 'react';
import { BarChart } from '@mui/x-charts';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Week 1',
  'Week 2',
  'Week 3',
  'Week 4',
  'Week 5',
  'Week 6 ',
  'Week 7',
];

export default function SimpleBarChart() {
  const chartStyle = {
    width: '100%', // Set the chart width to 100% of its container
  };

  return (
    <div style={chartStyle}>
      <BarChart
        width={'500'} // Set the chart width to 100% of its container
        height={300}
        series={[
          { data: pData, label: 'pv', id: 'pvId' },
          { data: uData, label: 'uv', id: 'uvId' },
        ]}
        xAxis={[{ data: xLabels, scaleType: 'band' }]}
      />
    </div>
  );
}
