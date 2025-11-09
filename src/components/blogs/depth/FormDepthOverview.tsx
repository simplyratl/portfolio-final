'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  AppWindowMacIcon,
  DatabaseIcon,
  Grid2x2Check,
  SortDescIcon,
} from 'lucide-react';
import React from 'react';

export function AppUsageSelect({ depth }: { depth: boolean }) {
  return (
    <Select>
      <SelectTrigger
        className={cn('w-[180px] sm:w-[280px]', !depth && '!bg-transparent')}
      >
        <SelectValue placeholder='Select usage type' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Usage Categories</SelectLabel>
          <SelectItem value='production'>Production</SelectItem>
          <SelectItem value='development'>Development</SelectItem>
          <SelectItem value='staging'>Staging</SelectItem>
          <SelectItem value='testing'>Testing</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Resource Type</SelectLabel>
          <SelectItem value='compute'>Compute Intensive</SelectItem>
          <SelectItem value='storage'>Storage Intensive</SelectItem>
          <SelectItem value='network'>Network Intensive</SelectItem>
          <SelectItem value='balanced'>Balanced</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Load Level</SelectLabel>
          <SelectItem value='light'>Light Load (0-25%)</SelectItem>
          <SelectItem value='moderate'>Moderate Load (25-50%)</SelectItem>
          <SelectItem value='heavy'>Heavy Load (50-75%)</SelectItem>
          <SelectItem value='critical'>Critical Load (75-100%)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SortBySelect({ depth }: { depth: boolean }) {
  return (
    <Select>
      <SelectTrigger
        className={cn('w-[180px] sm:w-[280px]', !depth && '!bg-transparent')}
      >
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Date</SelectLabel>
          <SelectItem value='date-newest'>Newest First</SelectItem>
          <SelectItem value='date-oldest'>Oldest First</SelectItem>
          <SelectItem value='last-modified'>Last Modified</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Name</SelectLabel>
          <SelectItem value='name-asc'>Name (A to Z)</SelectItem>
          <SelectItem value='name-desc'>Name (Z to A)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Performance</SelectLabel>
          <SelectItem value='size-asc'>Size (Smallest First)</SelectItem>
          <SelectItem value='size-desc'>Size (Largest First)</SelectItem>
          <SelectItem value='usage-high'>Usage (High to Low)</SelectItem>
          <SelectItem value='usage-low'>Usage (Low to High)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value='priority-high'>High Priority</SelectItem>
          <SelectItem value='priority-low'>Low Priority</SelectItem>
          <SelectItem value='status'>Status</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type TopCardProps = {
  title: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick?: () => void;
};

const TopCard = ({ title, icon, isSelected, onClick }: TopCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'text-accent border-border flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border',
        isSelected && 'bg-muted/20 text-foreground'
      )}
    >
      {icon}
      <span className='font-semibold'>{title}</span>
    </div>
  );
};

export const FormDepthOverview = () => {
  const [selectedType, setSelectedType] = React.useState<'app' | 'db' | null>(
    null
  );

  const [depth, setDepth] = React.useState(false);

  return (
    <div className={cn('rounded-xl p-4', depth && 'bg-white dark:bg-black')}>
      <div
        className={cn(
          'mx-auto max-w-md rounded-xl p-4',
          depth && 'bg-card shadow-s'
        )}
      >
        <div className='flex justify-end'>
          <Button onClick={() => setDepth(!depth)} className='mb-4' size='sm'>
            Toggle Depth
          </Button>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <TopCard
            title='App'
            icon={<AppWindowMacIcon size={26} />}
            isSelected={selectedType === 'app'}
            onClick={() => setSelectedType('app')}
          />
          <TopCard
            title='Database'
            icon={<DatabaseIcon size={26} />}
            isSelected={selectedType === 'db'}
            onClick={() => setSelectedType('db')}
          />
        </div>

        <div className='mt-4 space-y-4'>
          <div className='flex w-full items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <Grid2x2Check size={18} />
              <span className='font-semibold'>App Usage</span>
            </div>
            <AppUsageSelect depth={depth} />
          </div>
          <div className='flex w-full items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <SortDescIcon size={18} />
              <span className='font-semibold'>Sort by</span>
            </div>
            <SortBySelect depth={depth} />
          </div>
          <div className='flex w-full items-center justify-between gap-4'>
            <span>Show recent activity</span>
            <Switch />
          </div>
          <div className='flex w-full items-center justify-between gap-4'>
            <span>Fast refresh enabled</span>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};
