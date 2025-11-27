'use client';

import { useState, useEffect } from 'react';
import Tabs from '@/components/Tabs';
import PeriodSelector from '@/components/PeriodSelector';
import TVLChart from '@/components/TVLChart';
import APYChart from '@/components/APYChart';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { fetchTVLData, fetchAPYData } from '@/lib/api';
import { ChartData, TVLResponse, APYResponse } from '@/lib/types';

type TabType = 'tvl' | 'apy';
type PeriodType = 'week' | 'month' | 'year';

const PERIOD_DAYS: Record<PeriodType, number> = {
  week: 7,
  month: 30,
  year: 365,
};

const PERIOD_LABELS: Record<PeriodType, string> = {
  week: 'Week',
  month: 'Month',
  year: 'Year',
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('tvl');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('week');
  const [tvlData, setTvlData] = useState<ChartData | null>(null);
  const [apyData, setApyData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('darkMode'));
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      const days = PERIOD_DAYS[selectedPeriod];

      try {
        const [tvlResponse, apyResponse] = await Promise.all([
          fetchTVLData('XUSDC', days),
          fetchAPYData('XUSDC', days),
        ]);

        // Determine date format based on period
        const dateFormat: Intl.DateTimeFormatOptions =
          selectedPeriod === 'year'
            ? { month: 'short', day: 'numeric' }
            : selectedPeriod === 'month'
            ? { month: 'short', day: 'numeric' }
            : { month: 'short', day: 'numeric' };

        // Transform TVL data - use total TVL (deposit + borrow)
        const tvlChartData: ChartData = tvlResponse.chartData.map((point) => ({
          x: new Date(point.date).toLocaleDateString('en-US', dateFormat),
          y: point.depositTvl + point.borrowTvl, // Total TVL
        }));

        // Transform APY data - use average APY
        const apyChartData: ChartData = apyResponse.chartData.map((point) => ({
          x: new Date(point.date).toLocaleDateString('en-US', dateFormat),
          y: (point.depositApy + point.borrowApy) / 2, // Average APY
        }));

        setTvlData(tvlChartData);
        setApyData(apyChartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedPeriod]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const loadData = async () => {
      const days = PERIOD_DAYS[selectedPeriod];

      try {
        const [tvlResponse, apyResponse] = await Promise.all([
          fetchTVLData('XUSDC', days),
          fetchAPYData('XUSDC', days),
        ]);

        const dateFormat: Intl.DateTimeFormatOptions =
          selectedPeriod === 'year'
            ? { month: 'short', day: 'numeric' }
            : { month: 'short', day: 'numeric' };

        const tvlChartData: ChartData = tvlResponse.chartData.map((point) => ({
          x: new Date(point.date).toLocaleDateString('en-US', dateFormat),
          y: point.depositTvl + point.borrowTvl, // Total TVL
        }));

        const apyChartData: ChartData = apyResponse.chartData.map((point) => ({
          x: new Date(point.date).toLocaleDateString('en-US', dateFormat),
          y: (point.depositApy + point.borrowApy) / 2, // Average APY
        }));

        setTvlData(tvlChartData);
        setApyData(apyChartData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Loan Stats Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Total Value Locked (TVL) and Annual Percentage Yield (APY) for XUSDC
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Light</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Tabs and Period Selector */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
        </div>

        {/* Chart Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : activeTab === 'tvl' && tvlData ? (
            <TVLChart data={tvlData} />
          ) : activeTab === 'apy' && apyData ? (
            <APYChart data={apyData} />
          ) : null}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Data from MetalX API • Last {PERIOD_LABELS[selectedPeriod]}</p>
        </div>
      </div>
    </main>
  );
}


