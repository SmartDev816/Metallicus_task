'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChartData } from '@/lib/types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface APYChartProps {
  data: ChartData;
}

export default function APYChart({ data }: APYChartProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const series = [
    {
      name: 'APY',
      data: data.map((point) => point.y),
    },
  ];

  const options: any = {
    chart: {
      type: 'line' as const,
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: data.map((point) => point.x),
      labels: {
        style: {
          colors: isDark ? '#9CA3AF' : '#6B7280',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          return `${value.toFixed(2)}%`;
        },
        style: {
          colors: isDark ? '#9CA3AF' : '#6B7280',
        },
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (value: number) => {
          return `${value.toFixed(2)}%`;
        },
      },
    },
    colors: ['#10B981'],
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

