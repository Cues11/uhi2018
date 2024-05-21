import React from 'react';

const MapLegend = ({ map, type }) => {
  // This function below is how we are determining which set of data to show for the legend
  const getCorrectLegendText = () => {
    switch (type) {
      case 'Normalised_UHI':
        return [
          '0.00 - 51.80',
          '51.80 - 64.90',
          '64.90 - 67.70',
          '67.70 - 70.30',
          '70.30 - 77.20',
          '77.20 - 100.00'
        ];
      case 'Normalized_PerAnyVeg':
        return [
          '0.00 - 20.00',
          '20.00 - 26.90',
          '26.90 - 30.60',
          '30.60 - 34.80',
          '34.80 - 43.80',
          '43.80 - 100.00'
        ];
      case 'Normalized_PERANYTREE':
        return [
          '0.00 - 6.18',
          '6.18 - 10.10',
          '10.10 - 14.07',
          '14.07 - 18.74',
          '18.74 - 26.34',
          '26.34 - 100.00'
        ];
      case 'Normalized_PerGRASS':
        return [
          '0.00 - 4.14',
          '4.14 - 7.22',
          '7.22 - 10.15',
          '10.15 - 13.66',
          '13.66 - 19.00',
          '19.00 - 100.00'
        ];
      case 'Normalized_PerShrubtre':
        return [
          '0.00 - 12.40',
          '12.40 - 18.20',
          '18.20 - 22.40',
          '22.40 - 27.00',
          '27.00 - 34.30',
          '34.30 - 100.00'
        ];
      case 'Normalized_PerShrub':
        return [
          '0.00 - 8.75',
          '8.75 - 14.75',
          '14.75 - 18.23',
          '18.23 - 20.95',
          '20.95 - 24.04',
          '24.04 - 100.00'
        ];
    }
  };

  // This function will return 1 of the 2 colour schemes we use
  const getCorrectCircleColour = () => {
    if (type === 'Normalised_UHI') {
      return ['#2166AC', '#67A9CF', '#D1E5F0', '#FDDBC7', '#EF8A62', '#B2182B'];
    } else {
      return ['#F7FEAE', '#B7E6A5', '#7CCBA2', '#46AEA0', '#089099', '#00718B'];
    }
  };

  // This function will give us the Title to show for the legend
  const getLegendTitle = () => {
    switch (type) {
      case 'Normalised_UHI':
        return 'UHI';
      case 'Normalized_PerAnyVeg':
        return 'All Vegetation';
      case 'Normalized_PERANYTREE':
        return 'Trees';
      case 'Normalized_PerGRASS':
        return 'Grass';
      case 'Normalized_PerShrubtre':
        return 'Tree Shrub';
      case 'Normalized_PerShrub':
        return 'shrub';
    }
  };

  return (
    <div
      className='leaflet-bottom leaflet-left leaflet-control leaflet-bar map-legend'
      style={{ padding: '1rem', backgroundColor: 'white' }}
    >
      <div>
        <h4>
          <strong>{getLegendTitle()}</strong>
        </h4>
        <h6>Colour Legend</h6>
        {getCorrectLegendText().map((text, index) => {
          return (
            <div key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* This span is the circle and its getting the colour from the 'getCorrectCircleColour' function we have above */}
                <span
                  style={{
                    marginRight: '5px',
                    display: 'inline-block',
                    height: '10px',
                    width: '10px',
                    borderRadius: '50%',
                    backgroundColor: getCorrectCircleColour()[index]
                  }}
                />
                <p>{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapLegend;
