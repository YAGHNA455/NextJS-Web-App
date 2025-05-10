"use client";

import React, { useState } from 'react';
import { Project, ProjectSection, TabsConfig } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  LucideCalendar,
  LucideMapPin,
  LucideDollarSign,
  LucideUser,
  LucideImage,
  LucideVideo,
  LucideChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<ProjectSection>('images');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 text-white';
      case 'completed':
        return 'bg-blue-500 text-white';
      case 'on-hold':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const tabs: TabsConfig = [
    { value: 'images', label: 'Images', icon: <LucideImage className="h-4 w-4 mr-2" /> },
    { value: 'videos', label: 'Videos', icon: <LucideVideo className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects" className="flex items-center text-muted-foreground hover:text-foreground">
            <LucideChevronLeft className="h-4 w-4 mr-1" />
            Back to Projects
          </Link>
        </Button>
        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground mt-2">{project.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <LucideCalendar className="h-5 w-5 mr-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Timeline</p>
              <p className="font-medium">
                {new Date(project.startDate).toLocaleDateString()} -
                {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Ongoing'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <LucideMapPin className="h-5 w-5 mr-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium line-clamp-1">{project.location.address}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <LucideDollarSign className="h-5 w-5 mr-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-medium">{formatCurrency(project.budget)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <LucideUser className="h-5 w-5 mr-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Manager</p>
              <p className="font-medium">{project.manager}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>

      <Separator />

      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProjectSection)}>
          <TabsList>
            {tabs.map(({ value, label, icon }) => (
              <TabsTrigger key={value} value={value} className="flex items-center">
                {icon}
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="images" className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="images"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {project.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${project.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="videos" className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="videos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {project.videos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-video rounded-lg overflow-hidden"
                  >
                    <iframe
                      src={video}
                      title={`${project.name} - Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}