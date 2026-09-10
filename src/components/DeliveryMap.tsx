import { useEffect, useRef, useState } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { MapPin } from 'lucide-react'

// Grand Lake Farmers Market (AIM booth, Lake Park Ave, Oakland) and a sample
// delivery point ~1 km away in the Grand Lake neighbourhood.
const BOOTH = { lat: 37.8103, lng: -122.247 }
const DROP = { lat: 37.8168, lng: -122.2547 }

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/**
 * Live delivery-tracking map for DoorDash orders. A marker moves on a simulated
 * route between the market booth and the delivery address. Falls back to a
 * static placeholder if the API key is missing or Maps fails to load.
 */
export function DeliveryMap() {
  const ref = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    API_KEY ? 'loading' : 'error',
  )

  useEffect(() => {
    if (!API_KEY || !ref.current) return
    let cancelled = false
    let raf = 0

    async function init() {
      setOptions({ key: API_KEY!, v: 'weekly' })
      const [{ Map, Polyline }, { Marker }] = await Promise.all([
        importLibrary('maps'),
        importLibrary('marker'),
      ])
      if (cancelled || !ref.current) return

      const map = new Map(ref.current, {
        center: { lat: lerp(BOOTH.lat, DROP.lat, 0.5), lng: lerp(BOOTH.lng, DROP.lng, 0.5) },
        zoom: 15,
        disableDefaultUI: true,
        gestureHandling: 'none',
        keyboardShortcuts: false,
      })

      new Polyline({
        path: [BOOTH, DROP],
        strokeColor: '#008773',
        strokeWeight: 4,
        strokeOpacity: 0.9,
        map,
      })

      new Marker({ position: BOOTH, map, label: { text: 'Booth', fontSize: '11px' } })
      new Marker({ position: DROP, map, label: { text: 'You', fontSize: '11px' } })

      const dasher = new Marker({
        position: BOOTH,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#ff3008',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      })

      setStatus('ready')

      // simulated movement: booth -> drop over ~14s, pause ~2.5s, reset, loop
      const DURATION = 14000
      let start = performance.now()
      const tick = (now: number) => {
        if (cancelled) return
        const elapsed = now - start
        const t = Math.min(1, elapsed / DURATION)
        dasher.setPosition({
          lat: lerp(BOOTH.lat, DROP.lat, t),
          lng: lerp(BOOTH.lng, DROP.lng, t),
        })
        if (elapsed > DURATION + 2500) start = now
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    init().catch(() => {
      if (!cancelled) setStatus('error')
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border bg-muted">
      <div ref={ref} className="absolute inset-0" />
      {status !== 'ready' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-xs text-muted-foreground">
          <MapPin className="size-5" />
          {status === 'loading' ? 'Loading live map…' : 'Live map unavailable'}
        </div>
      )}
      {status === 'ready' && (
        <div className="absolute bottom-2 left-2 rounded-md bg-background/90 px-2 py-1 text-[11px] font-semibold shadow-sm">
          <span className="text-doordash">●</span> Dasher en route
        </div>
      )}
    </div>
  )
}
