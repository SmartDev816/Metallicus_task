'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChartData } from '@/lib/types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TVLChartProps {
  data: ChartData;
}

export default function TVLChart({ data }: TVLChartProps) {
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
      name: 'TVL',
      data: data.map((point) => point.y),
    },
  ];

  const options: any = {
    chart: {
      type: 'area' as const,
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
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
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
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value);
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
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);
        },
      },
    },
    colors: ['#3B82F6'],
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
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
}

