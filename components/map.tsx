'use client'
import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { LatLong } from '@/types';

const buildMapInfoCardContent = (title: string, body: string): string => {
    return `
    <div class="map_infocard_content">
        <div class="map_infocard_title">${title}</div>
        <div class="map_infocard_body">${body}</div>
    </div>`;
}

function Map(latlong: LatLong) {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            })

            const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

            // 43.6425662,-79.3870568
            const position = {
                lat: latlong.coordinates[0],
                lng: latlong.coordinates[1]
            }

            const mapOptions = {
                center: position,
                zoom: 17,
                mapId: 'PETRESCUE-1234'
            }

            // setup the map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

            const marker = new Marker({
                map: map,
                position: position,
                title: "Pet found here",
                icon: {
                    url: 'marker_flag.png',
                    size: new google.maps.Size(32,32)
                },
                animation: google.maps.Animation.DROP
            })

            const infoCard = new google.maps.InfoWindow({
                position: position,
                content: buildMapInfoCardContent('title', 'body'),
                minWidth: 200

            })

            infoCard.open({
                map: map,
                anchor: marker
            })
        }

        initMap()
    },[]);


  return (
    <div style={{ height: '600px'}} ref={mapRef} />
  )
}

export default Map