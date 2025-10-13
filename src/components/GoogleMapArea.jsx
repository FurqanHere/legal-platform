import React, { useEffect, useState, memo } from "react";
import { loadGoogleMapsScript } from "../services/GoogleMap"; // adjust path

const GoogleMapArea = memo(({ areaOld = [], onAreaSelected }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [polygon, setPolygon] = useState(null);

  useEffect(() => {
    const initializeMap = async () => {
      // const map_key = process.env.REACT_APP_MAP_KEY;
      const map_key = localStorage.getItem('map_key');


      if (!map_key) {
        console.error("Google Maps API key is missing");
        return;
      }

      try {
        const googleMaps = await loadGoogleMapsScript(map_key, [
          "drawing",
          "places",
        ]);

        const map = new googleMaps.Map(document.getElementById("map"), {
          center: { lat: 25.276987, lng: 55.296249 },
          zoom: 13,
        });

        setMapInstance(map);

        const drawingManagerInstance = new googleMaps.drawing.DrawingManager({
          drawingMode: googleMaps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: googleMaps.ControlPosition.TOP_CENTER,
            drawingModes: [googleMaps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: "#FF0000",
            fillOpacity: 0.2,
            strokeWeight: 2,
            strokeColor: "#FF0000",
            clickable: true,
            editable: true,
            draggable: true,
          },
        });

        drawingManagerInstance.setMap(map);

        // Capture polygon once it's drawn
        googleMaps.event.addListener(
          drawingManagerInstance,
          "overlaycomplete",
          (event) => {
            if (event.type === "polygon") {
              // Remove existing polygon if any
              if (polygon) {
                polygon.setMap(null);
              }

              const newPolygon = event.overlay;
              setPolygon(newPolygon);

              const coordinates = newPolygon
                .getPath()
                .getArray()
                .map((latLng) => ({
                  lat: latLng.lat(),
                  lng: latLng.lng(),
                }));

              if (onAreaSelected) {
                onAreaSelected(coordinates);
              }

              // Stop drawing mode
              drawingManagerInstance.setDrawingMode(null);
            }
          }
        );

        setDrawingManager(drawingManagerInstance);

        // If old area exists, draw it
        if (areaOld && areaOld.length > 0) {
          const oldPolygon = new googleMaps.Polygon({
            paths: areaOld,
            map,
            editable: true,
            draggable: true,
            strokeColor: "#00AA00",
            fillColor: "#00AA00",
            fillOpacity: 0.2,
            strokeWeight: 2,
          });

          setPolygon(oldPolygon);

          // Move map center to first coordinate
          map.setCenter(areaOld[0]);

          // Optional: trigger callback
          if (onAreaSelected) {
            onAreaSelected(areaOld);
          }
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initializeMap();
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
});

export default GoogleMapArea;
