import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChapterData, initialChapterData } from '@/types/chapter';

interface ChapterDataContextType {
  chapterData: ChapterData;
  updateChapterData: (data: Partial<ChapterData>) => void;
  updateStrategicObjectives: (objectives: Partial<ChapterData['strategicObjectives']>) => void;
  updateLeadership: (leadership: ChapterData['leadership']) => void;
  updatePerformanceMetrics: (metrics: Partial<ChapterData['performanceMetrics']>) => void;
  submitReport: (reportType: keyof ChapterData['reports'], completedBy: string) => void;
}

const ChapterDataContext = createContext<ChapterDataContextType | undefined>(undefined);

const STORAGE_KEY = 'bni-felix-chapter-data';

export function ChapterDataProvider({ children }: { children: React.ReactNode }) {
  const [chapterData, setChapterData] = useState<ChapterData>(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        // Merge with initial data to ensure new leadership roles are included
        return {
          ...initialChapterData,
          ...parsedData,
          leadership: initialChapterData.leadership // Always use the latest leadership structure
        };
      } catch (e) {
        console.error('Failed to parse stored chapter data:', e);
        return initialChapterData;
      }
    }
    return initialChapterData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chapterData));
  }, [chapterData]);

  const updateChapterData = (data: Partial<ChapterData>) => {
    setChapterData(prev => ({
      ...prev,
      ...data,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  const updateStrategicObjectives = (objectives: Partial<ChapterData['strategicObjectives']>) => {
    setChapterData(prev => ({
      ...prev,
      strategicObjectives: {
        ...prev.strategicObjectives,
        ...objectives
      },
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  const updateLeadership = (leadership: ChapterData['leadership']) => {
    setChapterData(prev => ({
      ...prev,
      leadership,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  const updatePerformanceMetrics = (metrics: Partial<ChapterData['performanceMetrics']>) => {
    setChapterData(prev => ({
      ...prev,
      performanceMetrics: {
        ...prev.performanceMetrics,
        ...metrics
      },
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  const submitReport = (reportType: keyof ChapterData['reports'], completedBy: string) => {
    setChapterData(prev => ({
      ...prev,
      reports: {
        ...prev.reports,
        [reportType]: {
          isCompleted: true,
          completedAt: new Date().toISOString(),
          completedBy
        }
      },
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  return (
    <ChapterDataContext.Provider
      value={{
        chapterData,
        updateChapterData,
        updateStrategicObjectives,
        updateLeadership,
        updatePerformanceMetrics,
        submitReport
      }}
    >
      {children}
    </ChapterDataContext.Provider>
  );
}

export function useChapterData() {
  const context = useContext(ChapterDataContext);
  if (context === undefined) {
    throw new Error('useChapterData must be used within a ChapterDataProvider');
  }
  return context;
}
