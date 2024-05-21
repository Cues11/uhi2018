import react, { useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import MapLegend from './components/MapLegend/MapLegend';
const geolocationData = require('./constants/MELUHIVEG.json');

function App() {
  // This is a state variable, using React.useState
  // We are are keeping track of what selectedMapComparisonData we are using('Normalized_PerAnyVeg', 'Normalized_PERANYTREE', 'Normalized_PerGRASS', 'Normalized_PerShrubtre', 'Normalized_PerShrub')
  // by default we are using 'Normalized_PerAnyVeg'
  const [selectedMapComparisonData, setSelectedMapComparisonData] = useState(
    'Normalized_PerAnyVeg'
  );

  // These are used to set up the Legend
  const [UHIMap, setUHIMap] = useState(null);
  const [comparisonMap, setComparisonMap] = useState(null);

  // we need this to make sure the popup data refreshes when selecting another set of data
  const [indexCounter, setIndexCounter] = useState(0);

  // This is a function to return the title of what is selected
  const getTitleOfData = () => {
    switch (selectedMapComparisonData) {
      case 'Normalized_PerAnyVeg':
        return 'All Vegetation';
      case 'Normalized_PERANYTREE':
        return 'Trees';
      case 'Normalized_PerGRASS':
        return 'Grass';
      case 'Normalized_PerShrubtre':
        return 'Shrub Tree';
      case 'Normalized_PerShrub':
        return 'Shrub';
    }
  };

  // style for UHI (first map)
  const geoJsonUHIDataStyle = (feature) => {
    const propertyToCompare = feature.properties.Normalised_UHI * 100;
    if (propertyToCompare > 0 && propertyToCompare < 51.8) {
      return { color: '#2166AC', fillOpacity: 1 };
    }
    if (propertyToCompare > 51.8 && propertyToCompare < 64.9) {
      return { color: '#67A9CF', fillOpacity: 1 };
    }
    if (propertyToCompare > 64.9 && propertyToCompare < 67.7) {
      return { color: '#D1E5F0', fillOpacity: 1 };
    }
    if (propertyToCompare > 67.7 && propertyToCompare < 70.3) {
      return { color: '#FDDBC7', fillOpacity: 1 };
    }
    if (propertyToCompare > 70.3 && propertyToCompare < 77.2) {
      return { color: '#EF8A62', fillOpacity: 1 };
    }
    if (propertyToCompare > 77.2 && propertyToCompare < 100) {
      return { color: '#B2182B', fillOpacity: 1 };
    }
  };

  //This is a function that will return the correct styling based on what comparison data we selected and will return the correct colours based on the values specified below
  const selectComparisionStyling = (feature) => {
    // This is the variable in the GeoJSON to check for
    const propertyToCompare =
      feature.properties[selectedMapComparisonData] * 100;

    // if the propertyToCompare variable is 'Normalized_PerAnyVeg' then return the following styles below
    if (selectedMapComparisonData === 'Normalized_PerAnyVeg') {
      if (propertyToCompare > 0 && propertyToCompare < 20) {
        return { color: '#F7FEAE', fillOpacity: 1 };
      }
      if (propertyToCompare > 20 && propertyToCompare < 26.9) {
        return { color: '#B7E6A5', fillOpacity: 1 };
      }
      if (propertyToCompare > 26.9 && propertyToCompare < 30.6) {
        return { color: '#7CCBA2', fillOpacity: 1 };
      }
      if (propertyToCompare > 30.6 && propertyToCompare < 34.8) {
        return { color: '#46AEA0', fillOpacity: 1 };
      }
      if (propertyToCompare > 34.8 && propertyToCompare < 43.8) {
        return { color: '#089099', fillOpacity: 1 };
      }
      if (propertyToCompare > 43.8 && propertyToCompare < 100) {
        return { color: '#00718B', fillOpacity: 1 };
      }
    }

    // if the propertyToCompare variable is 'Normalized_PERANYTREE' then return the following styles below
    if (selectedMapComparisonData === 'Normalized_PERANYTREE') {
      if (propertyToCompare > 0 && propertyToCompare < 6.18) {
        return { color: '#F7FEAE', fillOpacity: 1 };
      }
      if (propertyToCompare > 6.18 && propertyToCompare < 10.1) {
        return { color: '#B7E6A5', fillOpacity: 1 };
      }
      if (propertyToCompare > 10.1 && propertyToCompare < 14.07) {
        return { color: '#7CCBA2', fillOpacity: 1 };
      }
      if (propertyToCompare > 14.07 && propertyToCompare < 18.74) {
        return { color: '#46AEA0', fillOpacity: 1 };
      }
      if (propertyToCompare > 18.74 && propertyToCompare < 26.34) {
        return { color: '#089099', fillOpacity: 1 };
      }
      if (propertyToCompare > 26.34 && propertyToCompare < 100) {
        return { color: '#00718B', fillOpacity: 1 };
      }
    }

    // if the propertyToCompare variable is 'Normalized_PerGRASS' then return the following styles below
    if (selectedMapComparisonData === 'Normalized_PerGRASS') {
      if (propertyToCompare > 0 && propertyToCompare < 4.14) {
        return { color: '#F7FEAE', fillOpacity: 1 };
      }
      if (propertyToCompare > 4.14 && propertyToCompare < 7.22) {
        return { color: '#B7E6A5', fillOpacity: 1 };
      }
      if (propertyToCompare > 7.22 && propertyToCompare < 10.15) {
        return { color: '#7CCBA2', fillOpacity: 1 };
      }
      if (propertyToCompare > 10.15 && propertyToCompare < 13.66) {
        return { color: '#46AEA0', fillOpacity: 1 };
      }
      if (propertyToCompare > 13.66 && propertyToCompare < 19) {
        return { color: '#089099', fillOpacity: 1 };
      }
      if (propertyToCompare > 19 && propertyToCompare < 100) {
        return { color: '#00718B', fillOpacity: 1 };
      }
    }

    // if the propertyToCompare variable is 'Normalized_PerShrubtre' then return the following styles below
    if (selectedMapComparisonData === 'Normalized_PerShrubtre') {
      if (propertyToCompare > 0 && propertyToCompare < 12.4) {
        return { color: '#F7FEAE', fillOpacity: 1 };
      }
      if (propertyToCompare > 12.4 && propertyToCompare < 18.2) {
        return { color: '#B7E6A5', fillOpacity: 1 };
      }
      if (propertyToCompare > 18.2 && propertyToCompare < 22.4) {
        return { color: '#7CCBA2', fillOpacity: 1 };
      }
      if (propertyToCompare > 22.4 && propertyToCompare < 27) {
        return { color: '#46AEA0', fillOpacity: 1 };
      }
      if (propertyToCompare > 27 && propertyToCompare < 34.3) {
        return { color: '#089099', fillOpacity: 1 };
      }
      if (propertyToCompare > 34.3 && propertyToCompare < 100) {
        return { color: '#00718B', fillOpacity: 1 };
      }
    }

    // if the propertyToCompare variable is 'Normalized_PerShrub' then return the following styles below
    if (selectedMapComparisonData === 'Normalized_PerShrub') {
      if (propertyToCompare > 0 && propertyToCompare < 8.75) {
        return { color: '#F7FEAE', fillOpacity: 1 };
      }
      if (propertyToCompare > 8.75 && propertyToCompare < 14.75) {
        return { color: '#B7E6A5', fillOpacity: 1 };
      }
      if (propertyToCompare > 14.75 && propertyToCompare < 18.23) {
        return { color: '#7CCBA2', fillOpacity: 1 };
      }
      if (propertyToCompare > 18.23 && propertyToCompare < 20.95) {
        return { color: '#46AEA0', fillOpacity: 1 };
      }
      if (propertyToCompare > 20.95 && propertyToCompare < 24.04) {
        return { color: '#089099', fillOpacity: 1 };
      }
      if (propertyToCompare > 24.04 && propertyToCompare < 100) {
        return { color: '#00718B', fillOpacity: 1 };
      }
    }
  };

  return (
    <div className='App'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Urban Heat Island and Vegetation in Greater Melbourne</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* This box below is the set of radio buttons to select which data to show */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid black',
            width: '10vw'
          }}
        >
          <label>
            <input
              type='radio'
              value='Normalized_PerAnyVeg'
              checked={selectedMapComparisonData === 'Normalized_PerAnyVeg'}
              onChange={() => {
                setSelectedMapComparisonData('Normalized_PerAnyVeg');
                setIndexCounter(indexCounter + 1);
              }}
            />
            All Vegetation
          </label>
          <label>
            <input
              type='radio'
              value='Normalized_PERANYTREE'
              checked={selectedMapComparisonData === 'Normalized_PERANYTREE'}
              onChange={() => {
                setSelectedMapComparisonData('Normalized_PERANYTREE');
                setIndexCounter(indexCounter + 1);
              }}
            />
            Trees
          </label>
          <label>
            <input
              type='radio'
              value='Normalized_PerGRASS'
              checked={selectedMapComparisonData === 'Normalized_PerGRASS'}
              onChange={() => {
                setSelectedMapComparisonData('Normalized_PerGRASS');
                setIndexCounter(indexCounter + 1);
              }}
            />
            Grass
          </label>
          <label>
            <input
              type='radio'
              value='Normalized_PerShrubtre'
              checked={selectedMapComparisonData === 'Normalized_PerShrubtre'}
              onChange={() => {
                setSelectedMapComparisonData('Normalized_PerShrubtre');
                setIndexCounter(indexCounter + 1);
              }}
            />
            Shrub Trees
          </label>
          <label>
            <input
              type='radio'
              value='Normalized_PerShrub'
              checked={selectedMapComparisonData === 'Normalized_PerShrub'}
              onChange={() => {
                setSelectedMapComparisonData('Normalized_PerShrub');
                setIndexCounter(indexCounter + 1);
              }}
            />
            Shrubs
          </label>
        </div>

        <div style={{ display: 'flex' }}>
          {/* This is the first map showing UHI data */}
          <MapContainer
            center={[-37.814, 144.96332]}
            zoom={9}
            style={{ width: '45vw', height: '95vh' }}
            whenCreated={setUHIMap}
            preferCanvas={true}
          >
            {/* This is the background image for the map */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
              updateWhenZooming={false}
              updateWhenIdle={false}
            />

            {/* This is the component used to show all the polygons for the geoJSON data */}
            <GeoJSON
              data={geolocationData}
              filter={(feature) => feature.properties.Normalised_UHI}
              style={(feature) => geoJsonUHIDataStyle(feature)}
              // This onEachFeature is what we are using to append the popup box when an area is hovered over
              onEachFeature={(feature, layer) => {
                const htmlString = `<div><p><Strong>${
                  feature.properties.lga
                }</Strong></p><p><strong>UHI:</strong> ${(
                  feature.properties.Normalised_UHI * 100
                ).toFixed(3)}</p></div>`;

                layer.bindPopup(htmlString);

                layer.on('mouseover', function (e) {
                  this.openPopup();
                });
                layer.on('mouseout', function (e) {
                  this.closePopup();
                });
              }}
            />
            <MapLegend map={UHIMap} type='Normalised_UHI' />
          </MapContainer>

          {/* This is the 2nd map showing data comparison */}
          <MapContainer
            center={[-37.814, 144.96332]}
            zoom={9}
            style={{ width: '45vw', height: '95vh' }}
            whenCreated={setComparisonMap}
            preferCanvas={true}
          >
            {/* This is the background image for the map */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
              updateWhenZooming={false}
              updateWhenIdle={false}
            />

            {/* This is the component used to show all the polygons for the geoJSON data */}
            <GeoJSON
              key={indexCounter}
              data={geolocationData}
              filter={(feature) =>
                feature.properties[selectedMapComparisonData]
              }
              style={(feature) => selectComparisionStyling(feature)}
              // This onEachFeature is what we are using to append the popup box when an area is hovered over
              onEachFeature={(feature, layer) => {
                const htmlString = `<div><p><Strong>${
                  feature.properties.lga
                }</Strong></p><p><strong>UHI:</strong> ${(
                  feature.properties.Normalised_UHI * 100
                ).toFixed(3)}</p><p><strong>${getTitleOfData()}:</strong> ${(
                  feature.properties[selectedMapComparisonData] * 100
                ).toFixed(3)}</p></div>`;

                layer.bindPopup(htmlString);

                layer.on('mouseover', function (e) {
                  this.openPopup();
                });
                layer.on('mouseout', function (e) {
                  this.closePopup();
                });
              }}
            />
            <MapLegend map={comparisonMap} type={selectedMapComparisonData} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
