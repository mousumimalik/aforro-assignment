import { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import DashboardCard from './DashboardCard';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const DEFAULT_FILL = '#E8ECF4';

/** Highlighted markets — colors aligned with the design reference */
const COUNTRY_FILL = {
  'United States of America': '#F59E0B',
  Brazil: '#F87171',
  'Dem. Rep. Congo': '#93C5FD',
  'Democratic Republic of the Congo': '#93C5FD',
  'Saudi Arabia': '#0D9488',
  China: '#8B5CF6',
  Indonesia: '#4ADE80',
};

function getFill(name) {
  return COUNTRY_FILL[name] ?? DEFAULT_FILL;
}

function SalesMap() {
  return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{ scale: 145, center: [10, 0] }}
      className="w-full h-full"
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const name = geo.properties?.name ?? '';
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getFill(name)}
                stroke="#FFFFFF"
                strokeWidth={0.4}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', opacity: 0.85 },
                  pressed: { outline: 'none' },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}

const MemoMap = memo(SalesMap);

export default function SalesMapping() {
  return (
    <DashboardCard title="Sales Mapping by Country">
      <div className="flex-1 min-h-[200px] w-full flex items-center justify-center">
        <div className="w-full h-full max-h-[220px]">
          <MemoMap />
        </div>
      </div>
    </DashboardCard>
  );
}
