'use client';

import { useEffect, useMemo, useState } from 'react';
import AppTooltip from '@/components/shared/Tooltip';
import { Button } from '@/components/ui/button';

type City = {
  label: string;
  timeZone: string;
};

const CITIES_144: City[] = [
  { label: 'New York', timeZone: 'America/New_York' },
  { label: 'Los Angeles', timeZone: 'America/Los_Angeles' },
  { label: 'Chicago', timeZone: 'America/Chicago' },
  { label: 'Toronto', timeZone: 'America/Toronto' },
  { label: 'Vancouver', timeZone: 'America/Vancouver' },
  { label: 'Mexico City', timeZone: 'America/Mexico_City' },
  { label: 'São Paulo', timeZone: 'America/Sao_Paulo' },
  { label: 'Rio de Janeiro', timeZone: 'America/Sao_Paulo' },
  { label: 'Buenos Aires', timeZone: 'America/Argentina/Buenos_Aires' },
  { label: 'Santiago', timeZone: 'America/Santiago' },
  { label: 'Lima', timeZone: 'America/Lima' },
  { label: 'Bogotá', timeZone: 'America/Bogota' },
  { label: 'Caracas', timeZone: 'America/Caracas' },
  { label: 'Panama City', timeZone: 'America/Panama' },
  { label: 'San José', timeZone: 'America/Costa_Rica' },
  { label: 'Havana', timeZone: 'America/Havana' },
  { label: 'Kingston', timeZone: 'America/Jamaica' },
  { label: 'San Juan', timeZone: 'America/Puerto_Rico' },
  { label: 'Honolulu', timeZone: 'Pacific/Honolulu' },
  { label: 'Anchorage', timeZone: 'America/Anchorage' },

  { label: 'London', timeZone: 'Europe/London' },
  { label: 'Paris', timeZone: 'Europe/Paris' },
  { label: 'Berlin', timeZone: 'Europe/Berlin' },
  { label: 'Madrid', timeZone: 'Europe/Madrid' },
  { label: 'Rome', timeZone: 'Europe/Rome' },
  { label: 'Amsterdam', timeZone: 'Europe/Amsterdam' },
  { label: 'Brussels', timeZone: 'Europe/Brussels' },
  { label: 'Zurich', timeZone: 'Europe/Zurich' },
  { label: 'Vienna', timeZone: 'Europe/Vienna' },
  { label: 'Prague', timeZone: 'Europe/Prague' },
  { label: 'Warsaw', timeZone: 'Europe/Warsaw' },
  { label: 'Stockholm', timeZone: 'Europe/Stockholm' },
  { label: 'Oslo', timeZone: 'Europe/Oslo' },
  { label: 'Copenhagen', timeZone: 'Europe/Copenhagen' },
  { label: 'Helsinki', timeZone: 'Europe/Helsinki' },
  { label: 'Dublin', timeZone: 'Europe/Dublin' },
  { label: 'Lisbon', timeZone: 'Europe/Lisbon' },
  { label: 'Athens', timeZone: 'Europe/Athens' },
  { label: 'Istanbul', timeZone: 'Europe/Istanbul' },
  { label: 'Kyiv', timeZone: 'Europe/Kyiv' },
  { label: 'Moscow', timeZone: 'Europe/Moscow' },
  { label: 'Belgrade', timeZone: 'Europe/Belgrade' },
  { label: 'Budapest', timeZone: 'Europe/Budapest' },
  { label: 'Bucharest', timeZone: 'Europe/Bucharest' },
  { label: 'Sofia', timeZone: 'Europe/Sofia' },
  { label: 'Reykjavík', timeZone: 'Atlantic/Reykjavik' },

  { label: 'Cairo', timeZone: 'Africa/Cairo' },
  { label: 'Lagos', timeZone: 'Africa/Lagos' },
  { label: 'Accra', timeZone: 'Africa/Accra' },
  { label: 'Abidjan', timeZone: 'Africa/Abidjan' },
  { label: 'Casablanca', timeZone: 'Africa/Casablanca' },
  { label: 'Algiers', timeZone: 'Africa/Algiers' },
  { label: 'Tunis', timeZone: 'Africa/Tunis' },
  { label: 'Tripoli', timeZone: 'Africa/Tripoli' },
  { label: 'Nairobi', timeZone: 'Africa/Nairobi' },
  { label: 'Addis Ababa', timeZone: 'Africa/Addis_Ababa' },
  { label: 'Khartoum', timeZone: 'Africa/Khartoum' },
  { label: 'Johannesburg', timeZone: 'Africa/Johannesburg' },
  { label: 'Cape Town', timeZone: 'Africa/Johannesburg' },
  { label: 'Dar es Salaam', timeZone: 'Africa/Dar_es_Salaam' },
  { label: 'Kampala', timeZone: 'Africa/Kampala' },
  { label: 'Kigali', timeZone: 'Africa/Kigali' },
  { label: 'Kinshasa', timeZone: 'Africa/Kinshasa' },
  { label: 'Luanda', timeZone: 'Africa/Luanda' },
  { label: 'Harare', timeZone: 'Africa/Harare' },
  { label: 'Windhoek', timeZone: 'Africa/Windhoek' },

  { label: 'Dubai', timeZone: 'Asia/Dubai' },
  { label: 'Abu Dhabi', timeZone: 'Asia/Dubai' },
  { label: 'Riyadh', timeZone: 'Asia/Riyadh' },
  { label: 'Jeddah', timeZone: 'Asia/Riyadh' },
  { label: 'Doha', timeZone: 'Asia/Qatar' },
  { label: 'Kuwait City', timeZone: 'Asia/Kuwait' },
  { label: 'Manama', timeZone: 'Asia/Bahrain' },
  { label: 'Muscat', timeZone: 'Asia/Muscat' },
  { label: 'Tehran', timeZone: 'Asia/Tehran' },
  { label: 'Baghdad', timeZone: 'Asia/Baghdad' },
  { label: 'Jerusalem', timeZone: 'Asia/Jerusalem' },
  { label: 'Beirut', timeZone: 'Asia/Beirut' },
  { label: 'Amman', timeZone: 'Asia/Amman' },
  { label: 'Damascus', timeZone: 'Asia/Damascus' },
  { label: 'Tbilisi', timeZone: 'Asia/Tbilisi' },
  { label: 'Yerevan', timeZone: 'Asia/Yerevan' },
  { label: 'Baku', timeZone: 'Asia/Baku' },

  { label: 'Karachi', timeZone: 'Asia/Karachi' },
  { label: 'Lahore', timeZone: 'Asia/Karachi' },
  { label: 'Delhi', timeZone: 'Asia/Kolkata' },
  { label: 'Mumbai', timeZone: 'Asia/Kolkata' },
  { label: 'Bengaluru', timeZone: 'Asia/Kolkata' },
  { label: 'Chennai', timeZone: 'Asia/Kolkata' },
  { label: 'Kolkata', timeZone: 'Asia/Kolkata' },
  { label: 'Dhaka', timeZone: 'Asia/Dhaka' },
  { label: 'Kathmandu', timeZone: 'Asia/Kathmandu' },
  { label: 'Colombo', timeZone: 'Asia/Colombo' },
  { label: 'Islamabad', timeZone: 'Asia/Karachi' },
  { label: 'Kabul', timeZone: 'Asia/Kabul' },

  { label: 'Bangkok', timeZone: 'Asia/Bangkok' },
  { label: 'Ho Chi Minh City', timeZone: 'Asia/Ho_Chi_Minh' },
  { label: 'Hanoi', timeZone: 'Asia/Ho_Chi_Minh' },
  { label: 'Phnom Penh', timeZone: 'Asia/Phnom_Penh' },
  { label: 'Vientiane', timeZone: 'Asia/Vientiane' },
  { label: 'Jakarta', timeZone: 'Asia/Jakarta' },
  { label: 'Surabaya', timeZone: 'Asia/Jakarta' },
  { label: 'Singapore', timeZone: 'Asia/Singapore' },
  { label: 'Kuala Lumpur', timeZone: 'Asia/Kuala_Lumpur' },
  { label: 'Manila', timeZone: 'Asia/Manila' },
  { label: 'Hong Kong', timeZone: 'Asia/Hong_Kong' },
  { label: 'Shenzhen', timeZone: 'Asia/Shanghai' },
  { label: 'Guangzhou', timeZone: 'Asia/Shanghai' },
  { label: 'Shanghai', timeZone: 'Asia/Shanghai' },
  { label: 'Beijing', timeZone: 'Asia/Shanghai' },
  { label: 'Taipei', timeZone: 'Asia/Taipei' },
  { label: 'Seoul', timeZone: 'Asia/Seoul' },
  { label: 'Busan', timeZone: 'Asia/Seoul' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { label: 'Osaka', timeZone: 'Asia/Tokyo' },
  { label: 'Nagoya', timeZone: 'Asia/Tokyo' },
  { label: 'Sapporo', timeZone: 'Asia/Tokyo' },
  { label: 'Ulaanbaatar', timeZone: 'Asia/Ulaanbaatar' },

  { label: 'Sydney', timeZone: 'Australia/Sydney' },
  { label: 'Melbourne', timeZone: 'Australia/Melbourne' },
  { label: 'Brisbane', timeZone: 'Australia/Brisbane' },
  { label: 'Perth', timeZone: 'Australia/Perth' },
  { label: 'Adelaide', timeZone: 'Australia/Adelaide' },
  { label: 'Auckland', timeZone: 'Pacific/Auckland' },
  { label: 'Wellington', timeZone: 'Pacific/Auckland' },
  { label: 'Fiji', timeZone: 'Pacific/Fiji' },
  { label: 'Port Moresby', timeZone: 'Pacific/Port_Moresby' },
  { label: 'Guam', timeZone: 'Pacific/Guam' },

  { label: 'San Francisco', timeZone: 'America/Los_Angeles' },
  { label: 'Seattle', timeZone: 'America/Los_Angeles' },
  { label: 'Denver', timeZone: 'America/Denver' },
  { label: 'Phoenix', timeZone: 'America/Phoenix' },
  { label: 'Dallas', timeZone: 'America/Chicago' },
  { label: 'Houston', timeZone: 'America/Chicago' },
  { label: 'Miami', timeZone: 'America/New_York' },
  { label: 'Washington DC', timeZone: 'America/New_York' },
  { label: 'Boston', timeZone: 'America/New_York' },
  { label: 'Montreal', timeZone: 'America/Toronto' },
  { label: 'Ottawa', timeZone: 'America/Toronto' },
  { label: 'Calgary', timeZone: 'America/Edmonton' },
  { label: 'Edmonton', timeZone: 'America/Edmonton' },
  { label: 'Winnipeg', timeZone: 'America/Winnipeg' },
  { label: 'Halifax', timeZone: 'America/Halifax' },
  { label: 'St. John’s', timeZone: 'America/St_Johns' },

  { label: 'Brasília', timeZone: 'America/Sao_Paulo' },
  { label: 'Fortaleza', timeZone: 'America/Fortaleza' },
  { label: 'Recife', timeZone: 'America/Recife' },
  { label: 'Manaus', timeZone: 'America/Manaus' },
  { label: 'Quito', timeZone: 'America/Guayaquil' },
  { label: 'Guayaquil', timeZone: 'America/Guayaquil' },
  { label: 'La Paz', timeZone: 'America/La_Paz' },
  { label: 'Asunción', timeZone: 'America/Asuncion' },
  { label: 'Montevideo', timeZone: 'America/Montevideo' },

  { label: 'Milan', timeZone: 'Europe/Rome' },
  { label: 'Barcelona', timeZone: 'Europe/Madrid' },
  { label: 'Munich', timeZone: 'Europe/Berlin' },
  { label: 'Frankfurt', timeZone: 'Europe/Berlin' },
  { label: 'Hamburg', timeZone: 'Europe/Berlin' },
  { label: 'Cologne', timeZone: 'Europe/Berlin' },
  { label: 'Geneva', timeZone: 'Europe/Zurich' },
  { label: 'Bratislava', timeZone: 'Europe/Bratislava' },
  { label: 'Zagreb', timeZone: 'Europe/Zagreb' },
  { label: 'Ljubljana', timeZone: 'Europe/Ljubljana' },
  { label: 'Sarajevo', timeZone: 'Europe/Sarajevo' },
  { label: 'Skopje', timeZone: 'Europe/Skopje' },
  { label: 'Tirana', timeZone: 'Europe/Tirane' },
  { label: 'Podgorica', timeZone: 'Europe/Podgorica' },
  { label: 'Vilnius', timeZone: 'Europe/Vilnius' },
  { label: 'Riga', timeZone: 'Europe/Riga' },
  { label: 'Tallinn', timeZone: 'Europe/Tallinn' },

  { label: 'Kuala Lumpur', timeZone: 'Asia/Kuala_Lumpur' },
  { label: 'Chengdu', timeZone: 'Asia/Shanghai' },
  { label: 'Chongqing', timeZone: 'Asia/Shanghai' },
  { label: 'Wuhan', timeZone: 'Asia/Shanghai' },
  { label: 'Hangzhou', timeZone: 'Asia/Shanghai' },
  { label: 'Nanjing', timeZone: 'Asia/Shanghai' },
  { label: 'Tianjin', timeZone: 'Asia/Shanghai' },
  { label: 'Xi’an', timeZone: 'Asia/Shanghai' },
  { label: 'Shenyang', timeZone: 'Asia/Shanghai' },
  { label: 'Harbin', timeZone: 'Asia/Shanghai' },
  { label: 'Dalian', timeZone: 'Asia/Shanghai' },
  { label: 'Fukuoka', timeZone: 'Asia/Tokyo' },
  { label: 'Kobe', timeZone: 'Asia/Tokyo' },
  { label: 'Kyoto', timeZone: 'Asia/Tokyo' },
  { label: 'Incheon', timeZone: 'Asia/Seoul' },
  { label: 'Daegu', timeZone: 'Asia/Seoul' },

  { label: 'Total (Local)', timeZone: 'UTC' },
];

// Ensure we always render exactly 144 entries (pads/trims without changing UI).
const cities144: City[] = (() => {
  const list = CITIES_144.filter((c) => c.timeZone && c.label);
  const unique = list.slice(0, 144);
  while (unique.length < 144) {
    unique.push(list[unique.length % list.length]);
  }
  return unique.slice(0, 144);
})();

const combinations = {
  'bottom-right-corner': [90, 0],
  'bottom-left-corner': [180, 90],
  'top-left-corner': [270, 180],
  'top-right-corner': [270, 0],
  straight: [90, 270],
  line: [180, 0],
  unused: [-220, -220],
};

const numbers = {
  0: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['straight'],
    combinations['straight'],
    combinations['straight'],
    combinations['straight'],

    combinations['straight'],
    combinations['straight'],
    combinations['straight'],
    combinations['straight'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],

  1: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],
    combinations['unused'],

    combinations['top-right-corner'],
    combinations['bottom-left-corner'],
    combinations['straight'],
    combinations['unused'],

    combinations['unused'],
    combinations['straight'],
    combinations['straight'],
    combinations['unused'],

    combinations['unused'],
    combinations['straight'],
    combinations['straight'],
    combinations['unused'],

    combinations['bottom-right-corner'],
    combinations['top-left-corner'],
    combinations['top-right-corner'],
    combinations['bottom-left-corner'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],

  2: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['top-left-corner'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],

  3: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['unused'],
    combinations['bottom-right-corner'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['unused'],
    combinations['top-right-corner'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],

  4: [
    combinations['bottom-right-corner'],
    combinations['bottom-left-corner'],
    combinations['bottom-right-corner'],
    combinations['bottom-left-corner'],

    combinations['straight'],
    combinations['straight'],
    combinations['straight'],
    combinations['straight'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['unused'],
    combinations['unused'],
    combinations['straight'],
    combinations['straight'],

    combinations['unused'],
    combinations['unused'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
  ],

  5: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['top-left-corner'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],

  6: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['top-left-corner'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],

  7: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['unused'],
    combinations['unused'],
    combinations['straight'],
    combinations['straight'],

    combinations['unused'],
    combinations['unused'],
    combinations['straight'],
    combinations['straight'],

    combinations['unused'],
    combinations['unused'],
    combinations['straight'],
    combinations['straight'],

    combinations['unused'],
    combinations['unused'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
  ],

  8: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],

  9: [
    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['bottom-left-corner'],

    combinations['straight'],
    combinations['bottom-right-corner'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['straight'],
    combinations['top-right-corner'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['bottom-left-corner'],
    combinations['straight'],

    combinations['bottom-right-corner'],
    combinations['line'],
    combinations['top-left-corner'],
    combinations['straight'],

    combinations['top-right-corner'],
    combinations['line'],
    combinations['line'],
    combinations['top-left-corner'],
  ],
};

const ClockNode = ({
  index,
  clockNumber,
  city,
  onCitySelect,
}: {
  index: number;
  clockNumber: number;
  city?: City;
  onCitySelect?: (timeZone: string) => void;
}) => {
  const combination = numbers[(clockNumber % 10) as keyof typeof numbers];

  const [targetA, targetB] = useMemo(
    () => combination[index],
    [combination, index]
  );

  const [angleA, setAngleA] = useState(targetA);
  const [angleB, setAngleB] = useState(targetB);

  useEffect(() => {
    const mod = (value: number, modulus: number) =>
      ((value % modulus) + modulus) % modulus;

    const shortestDelta = (from: number, to: number) => {
      const fromNorm = mod(from, 360);
      return mod(to - fromNorm + 540, 360) - 180;
    };

    setAngleA((prev) => prev + shortestDelta(prev, targetA));
    setAngleB((prev) => prev + shortestDelta(prev, targetB));
  }, [targetA, targetB]);

  if (!combination[index]) {
    return null;
  }

  const timeString = city
    ? new Date().toLocaleTimeString('en-US', {
        timeZone: city.timeZone,
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <AppTooltip text={city ? `${city.label}: ${timeString}` : ''}>
      <div
        className='bg-background/40 border-border relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2'
        onClick={() => city && onCitySelect?.(city.timeZone)}
      >
        <span
          className='bg-primary absolute top-1/2 left-1/2 h-1 w-1/2 origin-[center_left] transition-all'
          style={{
            transform: `rotate(${angleA}deg)`,
            scale: combination[index] === combinations['unused'] ? '0' : '1',
            transitionDuration:
              combination[index] === combinations['unused'] ? '400ms' : '250ms',
          }}
        ></span>
        <span
          className='bg-primary absolute top-1/2 left-1/2 h-1 w-1/2 origin-[center_left] transition-all'
          style={{
            transform: `rotate(${angleB}deg)`,
            scale: combination[index] === combinations['unused'] ? '0' : '1',
            transitionDuration:
              combination[index] === combinations['unused'] ? '400ms' : '250ms',
          }}
        ></span>
      </div>
    </AppTooltip>
  );
};

const PlaygroundClock = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (timeZone) {
        const timeString = now.toLocaleTimeString('en-GB', {
          timeZone,
        });
        const [h, m, s] = timeString.split(':').map(Number);
        setHour(h);
        setMinute(m);
        setSecond(s);
      } else {
        setHour(now.getHours());
        setMinute(now.getMinutes());
        setSecond(now.getSeconds());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='grid h-[200px] grid-cols-3 gap-10'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='grid grid-cols-4 grid-rows-6 gap-0.5'>
            {new Array(24).fill(0).map((_, index) => (
              <ClockNode
                key={index}
                index={index}
                clockNumber={Math.floor(hour / 10)}
                city={cities144[index]}
                onCitySelect={setTimeZone}
              />
            ))}
          </div>
          <div className='grid grid-cols-4 grid-rows-6 gap-0.5'>
            {new Array(24).fill(0).map((_, index) => (
              <ClockNode
                key={index}
                index={index}
                clockNumber={hour % 10}
                city={cities144[24 + index]}
                onCitySelect={setTimeZone}
              />
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='grid w-fit grid-cols-4 grid-rows-6 gap-0.5'>
            {new Array(24).fill(0).map((_, index) => (
              <ClockNode
                key={index}
                index={index}
                clockNumber={Math.floor(minute / 10)}
                city={cities144[48 + index]}
                onCitySelect={setTimeZone}
              />
            ))}
          </div>
          <div className='grid grid-cols-4 grid-rows-6 gap-0.5'>
            {new Array(24).fill(0).map((_, index) => (
              <ClockNode
                key={index}
                index={index}
                clockNumber={minute % 10}
                city={cities144[72 + index]}
                onCitySelect={setTimeZone}
              />
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div className='grid grid-cols-4 grid-rows-6 gap-0.5'>
            {new Array(24).fill(0).map((_, index) => (
              <ClockNode
                key={index}
                index={index}
                clockNumber={Math.floor(second / 10)}
                city={cities144[96 + index]}
                onCitySelect={setTimeZone}
              />
            ))}
          </div>
          <div className='grid w-fit grid-cols-4 grid-rows-6 gap-0.5'>
            {new Array(24).fill(0).map((_, index) => (
              <ClockNode
                key={index}
                index={index}
                clockNumber={second % 10}
                city={cities144[120 + index]}
                onCitySelect={setTimeZone}
              />
            ))}
          </div>
        </div>
      </div>
      <Button onClick={() => setTimeZone(undefined)} disabled={!timeZone}>
        Current Time
      </Button>
    </div>
  );
};

export default PlaygroundClock;
