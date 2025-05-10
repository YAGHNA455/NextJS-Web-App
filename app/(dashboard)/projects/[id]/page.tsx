"use client";

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Project } from '@/types';
import { sampleProjects } from '@/lib/sample-data';
import ProjectDetails from '@/components/projects/ProjectDetails';

interface ProjectPageProps {
    params: {
        id: string;
    };
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call delay
        const timer = setTimeout(() => {
            const foundProject = sampleProjects.find(p => p.id === params.id);
            setProject(foundProject || null);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) {
        notFound();
    }

    return <ProjectDetails project={project} />;
}