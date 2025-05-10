"use client";

import React from 'react';
import { motion } from 'framer-motion';
import DashboardCharts from '@/components/charts/DashboardCharts';

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Data Visualization</h1>
        <p className="text-muted-foreground mt-1">Visual insights of project performance and distribution</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <DashboardCharts />
      </motion.div>
    </div>
  );
}