// @ts-ignore
import Supercluster from "supercluster";
import { useMemo } from "react";
import { Region } from "react-native-maps";

type Point = {
  id: number;
  latitude: number;
  longitude: number;
  [key: string]: any;
};

type ClusterItem = {
  id: string | number;
  latitude: number;
  longitude: number;
  count: number;
  children: Point[];
  isCluster: true;
} | Point & { isCluster?: false };

export const useClusteredPoints = (points: Point[], region: Region): ClusterItem[] => {
  const clusterer = useMemo(() => {
    const supercluster = new Supercluster({
      radius: 60,
      maxZoom: 16,
    });

    const geoPoints = points.map((p) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [p.longitude, p.latitude],
      },
      properties: { ...p },
    }));

    supercluster.load(geoPoints);

    return supercluster;
  }, [points]);

  const bbox = [
    region.longitude - region.longitudeDelta,
    region.latitude - region.latitudeDelta,
    region.longitude + region.longitudeDelta,
    region.latitude + region.latitudeDelta,
  ];

  const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);

  const clusters = clusterer.getClusters(bbox, zoom);

  return clusters.map((cluster: { geometry: { coordinates: [any, any]; }; properties: { cluster: any; point_count: any; }; id: any; }) => {
    const [longitude, latitude] = cluster.geometry.coordinates;

    if (cluster.properties.cluster) {
      const children = clusterer.getLeaves(cluster.id, Infinity);
      return {
        id: cluster.id,
        latitude,
        longitude,
        count: cluster.properties.point_count,
        children: children.map((c: any) => c.properties),
        isCluster: true,
      };
    }

    return {
      ...cluster.properties,
      latitude,
      longitude,
      isCluster: false,
    };
  });
};
