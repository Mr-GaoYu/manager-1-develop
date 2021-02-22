import React from 'react';
import { Meta } from '@storybook/react';
import CircleProgress from './CircleProgress';

export default {
  title: 'Circle Progress Indicator',
  component: CircleProgress
} as Meta;

export const Indefinite = () => <CircleProgress noTopMargin />;

export const Mini = () => <CircleProgress mini />;

export const Tag = () => <CircleProgress tag mini />;

export const DataInside = () => (
  <CircleProgress noTopMargin green variant="static" value={50}>
    <span data-qa-progress-label>Some data</span>
  </CircleProgress>
);
