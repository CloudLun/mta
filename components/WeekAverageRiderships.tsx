"use client"
import React, { useRef, useEffect, useState } from 'react'

import * as d3 from "d3"
import mapboxgl from 'mapbox-gl';

const WeekAverageRiderships = () => {

    const [lng, setLng] = useState(-73.949);
    const [lat, setLat] = useState(40.748);
    const [zoom, setZoom] = useState(11.40);
    const [map, setMap] = useState<mapboxgl.Map | null>(null)

    const mapContainer = useRef<HTMLInputElement>(null);
    const ref = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const height = ref.current!.clientHeight
        const width = ref.current!.clientWidth

        const meanRatio = 0.5835903157403469
        const sd = 0.15891959898745858



        const weekAveragePromise = d3.csv("/data/station_week_average.csv")
        // const ridershipData = d3.csv('/data/riderships_2023_week.csv')


        Promise.all([weekAveragePromise]).then(data => {

            const weekAverageData = data[0]
            const weekdayAverageData = weekAverageData.filter(w => w.weekend === "False")

            //    @ts-ignore
            const stationWeekAverageData = weekAverageData
                .filter(w => w.weekend === "True")
                .reduce((stationWeekAverageData, w, i) => {
                    //    @ts-ignore
                    stationWeekAverageData.push({
                        name: w['station_complex'],
                        borough: w["borough"],
                        routes: w["routes"],
                        weekendAverage: +w.average,
                        weekdayAverage: 0,
                        totalAverage: 0,
                        weekendRatio: 0,
                        latitude: +w.latitude,
                        longitude: +w.longitude
                    })
                    return stationWeekAverageData
                }, [])

            weekdayAverageData.forEach((weekday, i) => {
                stationWeekAverageData.forEach((week, j) => {
                    if (weekday['station_complex'] === week['name']) {
                        //    @ts-ignore
                        stationWeekAverageData[j].weekdayAverage = +weekdayAverageData[i].average
                        //    @ts-ignore
                        stationWeekAverageData[j].totalAverage = stationWeekAverageData[j].weekdayAverage + stationWeekAverageData[j].weekendAverage
                        //    @ts-ignore
                        stationWeekAverageData[j]['weekendRatio'] = (stationWeekAverageData[j].weekendAverage / stationWeekAverageData[j].weekdayAverage)
                    }
                })
            })

            console.log(stationWeekAverageData)
              // @ts-ignore
            const ratioArr = stationWeekAverageData.map(s => s.weekendRatio)
            // console.log(ratioArr)
              // @ts-ignore
            function getStandardDeviation(array) {
                const n = array.length
                              // @ts-ignore
                const mean = array.reduce((a, b) => a + b) / n
                              // @ts-ignore
                return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
            }



            console.log(sd)

            const stationWeekAverageGeoJSON = stationWeekAverageData.map((s, i) => {
                return ({
                    "type": "Feature",
                                  // @ts-ignore
                    "properties": { ...s },
                    "geometry": {
                        "coordinates": [
                            +s['longitude'],
                            +s['latitude']
                        ],
                        "type": "Point"
                    }
                })
            })




            mapboxgl.accessToken =
                "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw";
            const m = new mapboxgl.Map({
                container: mapContainer.current || "",
                style: "mapbox://styles/cloudlun/clle3783901j201p43864c07n",
                center: [lng, lat],
                zoom: zoom,
                interactive: true,
                doubleClickZoom: false,
            });

            m.on("move", () => {
                setLng(Number(m.getCenter().lng.toFixed(4)));
                setLat(Number(m.getCenter().lat.toFixed(4)));
                setZoom(Number(m.getZoom()));
            });

            m.on("load", () => {
                setMap(m);

                m.addSource("station", {
                    type: "geojson",
                    data: {
                        'type': 'FeatureCollection',
                                      // @ts-ignore
                        'features': stationWeekAverageGeoJSON
                    }
                })

                m.addLayer({
                    id: 'station',
                    type: "circle",
                    source: "station",
                    paint: {
                        "circle-radius": 5,
                        "circle-color": [
                            "case",
                            ["all", ['>=', ['get', 'weekendRatio'], meanRatio + sd / 2]],
                            "#0039A6",
                            ["all", ['<=', ['get', 'weekendRatio'], meanRatio - sd / 2]],
                            "#69b3a2",
                            "orange"
                        ]
                    }
                })

            })


            // (average weekEND daily ridership at 1 stop /  average weekEND daily ridership at ALL stops) / (average weekDAY daily ridership at 1 stop /  average weekDAY daily ridership at ALL stops)

            // average weekend daily ridership / average weekday daily ridership
            // const x = d3.scaleLinear().range([0, width]).domain([2500, 3300000])
            // const y = d3.scaleLinear().range([height, 0]).domain([6100, 5200000])
            const x = d3.scaleLinear().range([0, width]).domain([0, 1.5])
                          // @ts-ignore
            const y = d3.scaleBand().range([height - 40, 40]).domain(stationWeekAverageData.map(d => d.name))

            const svg = d3.select(ref.current)

            svg.append('line')
                .attr("x1", x(meanRatio))
                .attr("y1", 0)
                .attr("x2", x(meanRatio))
                .attr("y2", height)
                .style("stroke", "#eee")
                .style("stroke-width", 1)

            svg
                .selectAll('dots')
                .data(stationWeekAverageData)
                .join("circle")
                              // @ts-ignore
                .attr("cx", function (d) { return x(d.weekendRatio); })
                              // @ts-ignore
                .attr("cy", function (d) { return y(d.name); })
                .attr("r", 5)
                              // @ts-ignore
                .style("fill", d => d.weekendRatio > meanRatio + sd / 2 ? "#0039A6" : d.weekendRatio < meanRatio - sd / 2 ? "#69b3a2" : "orange")
            // .on("mouseover", (e, d, i) => {
            //     const lat = d.latitude
            //     const lng = d.longitude

            //     m.getSource("station").setData({
            //         type: "FeatureCollection",
            //         features: [
            //             {
            //                 // feature for Mapbox DC
            //                 'type': 'Feature',
            //                 'geometry': {
            //                     'type': 'Point',
            //                     'coordinates': [lng, lat]
            //                 },
            //                 'properties': {
            //                 }
            //             },
            //         ]
            //     })

            //     m.flyTo({
            //         center: [lng, lat],
            //         zoom: 12
            //     })

            // })



        })
    }, [])


    return (
        <div className="flex gap-[5vw] p-[40px] w-[100vw] h-[100vh]">
            <div className='relative w-[30%] h-full'>
                <div className='absolute top-[0px] left-[42%] font-semibold text-[#0039A6]'>Weekend Destination</div>
                <svg className='w-full h-full' ref={ref}></svg>
                <div className='absolute bottom-[0px] left-0 font-semibold text-[#69b3a2]'>Weekday Destination</div>
            </div>
            <div className='flex items-center w-[70%] h-full'>
                <div className='w-full h-full' ref={mapContainer}></div>
            </div>
        </div>

    )
}

export default WeekAverageRiderships