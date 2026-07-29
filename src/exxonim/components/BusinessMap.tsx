'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/exxonim/utils/cn';

/**
 * BusinessMap - clean office-location map (Leaflet + OpenStreetMap).
 *
 * Replaces the keyless Google Maps embed, which advertised every business
 * around the office (competitors included) with no way to hide them. Here
 * the map shows ONLY our branded pin + an always-open popup with the office
 * details; OSM base tiles carry no clickable business listings. "Open in
 * Google Maps" remains for directions/navigation.
 *
 * Leaflet (~40KB gz) loads lazily, and only once the map scrolls near the
 * viewport — a display:none instance (responsive duplicate) never boots, so
 * rendering one copy for desktop and one for mobile costs a single init.
 */

/* Exact position from the office's Google Business listing
 * (maps.app.goo.gl/oXEVfNzx1EKDtEzj6 → Exxonim Company Limited).
 * The old coords (-6.722, 39.187) from index.html's structured data
 * were ~3km off. */
const OFFICE_LAT = -6.7030171;
const OFFICE_LNG = 39.2096286;
/* The official share link — opens the real business listing directly
 * (reviews, directions), not a plus-code search. */
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/oXEVfNzx1EKDtEzj6';

const POPUP_HTML =
  '<strong>Exxonim Consult</strong><br/>' +
  'Mbezi Beach B, Africana — Bagamoyo Road,<br/>' +
  'Block H, House 9, Dar es Salaam';

/* Nearby wayfinding landmarks (coords from OpenStreetMap). Bus stops are how
 * directions are given locally — "shuka Africana" — so they anchor the office
 * in a place visitors already know. */
const LANDMARKS = [
  { name: 'Africana Bus Stop', lat: -6.702636, lng: 39.207706 },
  { name: 'Jogoo Bus Stop', lat: -6.707817, lng: 39.208776 },
];

export function BusinessMap({ className, lat, lng, label, googleMapsUrl }: {
  className?: string;
  lat?: number;
  lng?: number;
  label?: string;
  googleMapsUrl?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldInit, setShouldInit] = useState(false);

  const officeLat = lat ?? OFFICE_LAT;
  const officeLng = lng ?? OFFICE_LNG;
  const officeLabel = label || 'Exxonim Consult';
  const mapsUrl = googleMapsUrl || GOOGLE_MAPS_URL;

  /* Boot only when (nearly) visible. display:none containers never intersect,
   * so the hidden responsive duplicate never initialises. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldInit(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldInit) return;
    let disposed = false;
    let map: import('leaflet').Map | null = null;

  void (async () => {
    const [L] = await Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]);
    if (disposed || !containerRef.current) return;

    map = L.map(containerRef.current, {
      center: [officeLat, officeLng],
      zoom: 16,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    L.control.attribution({ position: 'bottomleft' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const pin = L.divIcon({
      className: 'exx-map-pin-wrap',
      html: '<span class="exx-map-pin" aria-hidden="true"></span>',
      iconSize: [34, 40],
      iconAnchor: [17, 38],
      popupAnchor: [0, -36],
    });

    const popupHtml = officeLabel
      ? `<strong>${officeLabel}</strong><br/>${POPUP_HTML}`
      : POPUP_HTML;

    L.marker([officeLat, officeLng], { icon: pin, keyboard: false })
      .addTo(map)
      .bindPopup(popupHtml, {
        closeButton: false,
        autoClose: false,
        closeOnClick: false,
        autoPan: false,
      })
      .openPopup();

    const landmarkIcon = L.divIcon({
      className: 'exx-landmark-dot-wrap',
      html: '<span class="exx-landmark-dot" aria-hidden="true"></span>',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
    for (const lm of LANDMARKS) {
      L.marker([lm.lat, lm.lng], { icon: landmarkIcon, keyboard: false, interactive: false })
        .addTo(map)
        .bindTooltip(lm.name, {
          permanent: true,
          direction: 'right',
          offset: [8, 0],
          className: 'exx-landmark-label',
        });
    }

    const bounds = L.latLngBounds([
      [officeLat, officeLng] as [number, number],
      ...LANDMARKS.map((lm) => [lm.lat, lm.lng] as [number, number]),
    ]);
    map.fitBounds(bounds, { maxZoom: 16, paddingTopLeft: [24, 110], paddingBottomRight: [24, 40] });
  })();

    return () => {
      disposed = true;
      map?.remove();
    };
  }, [shouldInit, officeLat, officeLng, officeLabel]);

  return (
    <div className={cn('business-map relative isolate overflow-hidden', className)}>
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
        role="application"
        aria-label="Map showing the Exxonim Consult office location"
      />
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 bottom-3 z-[1100] inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-surface/95 px-3.5 py-2 text-xs font-semibold text-accent shadow-md hover:bg-surface transition-colors"
      >
        Open in Google Maps
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
