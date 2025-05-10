"use client";

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LucideCalendar, LucideMapPin, LucideDollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
        return 'bg-green-500 hover:bg-green-600';
      case 'completed':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'on-hold':
        return 'bg-amber-500 hover:bg-amber-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <div 
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.images[0]})` }}
          >
            <div className="h-full w-full bg-black/30 flex items-end p-4">
              <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
            </div>
          </div>
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <LucideMapPin className="h-4 w-4 mr-2" />
                <span className="line-clamp-1">{project.location.address}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <LucideCalendar className="h-4 w-4 mr-2" />
                <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <LucideDollarSign className="h-4 w-4 mr-2" />
                <span>{formatCurrency(project.budget)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-5 pb-5 pt-0">
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}