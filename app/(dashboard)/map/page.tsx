"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sampleProjects } from '@/lib/sample-data';
import { Project } from '@/types';
import dynamic from 'next/dynamic';

// Dynamically import the map component with no SSR
const ProjectMap = dynamic(
  () => import('@/components/map/ProjectMap'),
  { ssr: false }
);

export default function MapPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setProjects(sampleProjects);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Project Map</h1>
        <p className="text-muted-foreground mt-1">Geographic overview of all project locations</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <ProjectMap projects={projects} />
      </motion.div>
    </div>
  );
}