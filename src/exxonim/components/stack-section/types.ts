import type { StackItem } from '@/exxonim/types';

export type FeatureVisualKey = string;

export interface FeatureRow {
  title: string;
  description: string;
  visualKey: FeatureVisualKey;
}

export interface FeatureVisualContent {
  workstreamValue: string;
  counterpartLabel: string;
  counterpartValue: string;
  focusValue: string;
  summaryTitle: string;
  summaryBody: string;
}

export type ExtendedStackItem = StackItem & {
  emphasis?: string;
  ctaHref?: string;
  ctaLabel?: string;
  featureRows?: FeatureRow[];
};
