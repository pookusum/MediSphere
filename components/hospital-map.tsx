"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Hospital } from "./hospital-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import mapboxgl from "mapbox-gl";

type Mode = "driving" | "walking" | "bicycling";

// ✅ Set access token once (use env variable)
mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
  (typeof window !== "undefined" ? (window as any).ENV_MAPBOX_TOKEN : "");

export function HospitalFinder({
  hospitals = [],
  user,
  selected,
  onSelect,
  mode = "driving",
}: {
  hospitals?: Hospital[];
  user?: { lat: number; lng: number };
  selected?: Hospital;
  onSelect?: (h: Hospital) => void;
  mode?: Mode;
}) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  // init map when token + container + user ready
  useEffect(() => {
    if (!mapboxgl.accessToken || !mapContainer.current || !user) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [user.lng, user.lat],
      zoom: 12,
      attributionControl: true,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      // add user marker
      map.addSource("user", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "Point", coordinates: [user.lng, user.lat] },
          properties: {},
        },
      });

      map.addLayer({
        id: "user-pin",
        type: "circle",
        source: "user",
        paint: { "circle-radius": 6, "circle-color": "#0ea5a6" },
      });

      // add hospitals
      map.addSource("hospitals", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: hospitals.map((h) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [h.lng, h.lat] },
            properties: { id: h.id, name: h.name },
          })),
        },
      });

      map.addLayer({
        id: "hospitals-pin",
        type: "circle",
        source: "hospitals",
        paint: { "circle-radius": 6, "circle-color": "#2563eb" },
      });

      // popup on click
      map.on("click", "hospitals-pin", (e: any) => {
        const f = e.features?.[0];
        const id = f?.properties?.id;
        const found = hospitals.find((x) => x.id === id);
        if (found) {
          const popupHtml = `<div style="font-size:14px"><strong>${found.name}</strong><br/>Beds: ${
            found.bedsTotal - found.bedsOccupied
          }/${found.bedsTotal}<br/>OPD: ${found.opdQueue}</div>`;
          new mapboxgl.Popup()
            .setLngLat(f.geometry.coordinates)
            .setHTML(popupHtml)
            .addTo(map);
          onSelect?.(found);
        }
      });

      // cursor changes
      map.on("mouseenter", "hospitals-pin", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "hospitals-pin", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, [user]);

  useEffect(() => {
  const map = mapRef.current;
  if (!map) return;

  const src = map.getSource("hospitals") as mapboxgl.GeoJSONSource;
  if (src && hospitals) {
    const features: GeoJSON.Feature[] = hospitals.map((h) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [h.lng, h.lat],
      },
      properties: {
        id: h.id,
        name: h.name,
      },
    }));

    const featureCollection: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features,
    };

    src.setData(featureCollection);
  }
}, [hospitals]);


  // fly to selected hospital
  useEffect(() => {
    const map = mapRef.current;
    if (map && selected) {
      map.flyTo({ center: [selected.lng, selected.lat], zoom: 14 });
    }
  }, [selected]);

  // directions URL
  const directionUrl = useMemo(() => {
    if (!user || !selected) return "#";
    return `https://www.google.com/maps/dir/?api=1&origin=${user.lat},${user.lng}&destination=${selected.lat},${selected.lng}&travelmode=${mode}`;
  }, [user, selected, mode]);

  return (
    <Card className="overflow-hidden">
      <div className="h-[420px] w-full">
        {!mapboxgl.accessToken ? (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Map requires Mapbox token. Set NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive map.
          </div>
        ) : (
          <div ref={mapContainer} className="h-full w-full" />
        )}
      </div>
      {selected && (
        <div className="flex items-center justify-between border-t p-4">
          <div>
            <p className="text-sm font-medium">{selected.name}</p>
            <p className="text-xs text-muted-foreground">
              Beds: {selected.bedsTotal - selected.bedsOccupied}/{selected.bedsTotal} · OPD: {selected.opdQueue}
              {typeof selected.distanceKm === "number"
                ? ` · ${selected.distanceKm.toFixed(1)} km`
                : ""}
            </p>
          </div>
          <a href={directionUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary text-primary-foreground hover:opacity-90">
              Route
            </Button>
          </a>
        </div>
      )}
    </Card>
  );
}

export default HospitalFinder;
