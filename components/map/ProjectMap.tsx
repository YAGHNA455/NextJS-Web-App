"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import Overlay from 'ol/Overlay';

interface ProjectMapProps {
  projects: Project[];
}

export default function ProjectMap({ projects }: ProjectMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!mapRef.current || mapInitialized) return;

    const initializeMap = () => {
      try {
        const vectorSource = new VectorSource();
        projects.forEach(project => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([project.location.lng, project.location.lat])),
            project: project,
          });

          const getMarkerColor = (status: string) => {
            switch (status) {
              case 'active': return '#22c55e';
              case 'completed': return '#3b82f6';
              case 'on-hold': return '#f59e0b';
              default: return '#6b7280';
            }
          };

          feature.setStyle(new Style({
            image: new CircleStyle({
              radius: 12,
              fill: new Fill({
                color: getMarkerColor(project.status),
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 2,
              }),
            }),
            text: new Text({
              text: (projects.indexOf(project) + 1).toString(),
              fill: new Fill({
                color: '#ffffff',
              }),
              font: 'bold 12px sans-serif',
              offsetY: 1,
            }),
          }));

          vectorSource.addFeature(feature);
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        const popup = new Overlay({
          element: popupRef.current!,
          positioning: 'bottom-center',
          offset: [0, -10],
          autoPan: true,
          autoPanAnimation: {
            duration: 250,
          },
        });

        const map = new Map({
          target: mapRef.current!,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer,
          ],
          view: new View({
            center: fromLonLat([-95, 38]),
            zoom: 4,
          }),
          overlays: [popup],
        });

        map.on('click', function (evt) {
          const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
          });

          if (feature) {
            const project = feature.get('project') as Project;
            const coordinates = (feature.getGeometry() as Point).getCoordinates();

            setSelectedProject(project);

            popup.setPosition(coordinates);
          } else {
            popup.setPosition(undefined);
            setSelectedProject(null);
          }
        });

        map.on('pointermove', function (e) {
          if (!map || !e.pixel) return;
          const pixel = map.getEventPixel(e.originalEvent);
          const hit = map.hasFeatureAtPixel(pixel);
          const target = map.getTargetElement();
          if (target) {
            target.style.cursor = hit ? 'pointer' : '';
          }
        });

        mapInstanceRef.current = map;

        if (projects.length > 0) {
          const extent = vectorSource.getExtent();
          map.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 500,
          });
        }

        setMapInitialized(true);
      } catch (error) {
        console.error('Error initializing map:', error);
        toast.error('Failed to initialize map');
      }
    };

    const timer = setTimeout(initializeMap, 100);
    return () => clearTimeout(timer);
  }, [projects, mapInitialized]);

  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.updateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] rounded-lg overflow-hidden border">
      <div ref={mapRef} className="w-full h-full" />

      <div ref={popupRef} className="absolute z-10 pointer-events-none opacity-0 transition-opacity duration-200">
        {selectedProject && (
          <Card className="w-64 shadow-lg pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-medium line-clamp-1">{selectedProject.name}</h4>
                <Badge className="ml-2 shrink-0">{selectedProject.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{selectedProject.description}</p>
              <p className="text-xs flex items-center">
                <span className="font-medium">Location:</span>
                <span className="ml-1 text-muted-foreground line-clamp-1">{selectedProject.location.address}</span>
              </p>
              <Button
                size="sm"
                className="w-full mt-2"
                onClick={() => {
                  toast.info(`Navigating to ${selectedProject.name}`);
                  router.push(`/projects/${selectedProject.id}`);
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}