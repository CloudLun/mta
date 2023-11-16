"use client"
import React, { useRef, useEffect, useState } from 'react'

import * as d3 from "d3"

const WeekHourRiderships = () => {

    const weekdayRef = useRef<SVGSVGElement | null>(null)
    const weekendRef = useRef<SVGSVGElement | null>(null)

    const weekRef = [weekdayRef, weekendRef]
    const week = ["weekday", "weekend"]

    useEffect(() => {


        const height = weekdayRef.current!.clientHeight
        const width = weekdayRef.current!.clientWidth


        d3.csv("/data/week_hour_ridership.csv").then(data => {
            const x = d3.scaleBand().range([0, width]).domain(data.map(d => d.hour)).padding(0.2)
            const y = d3.scaleLinear().domain([0, 12000000]).range([height, 0])

            d3.select(weekdayRef.current)
                .selectAll(`weekdaybars`)
                .data(data)
                .enter()
                .append("rect")
                              // @ts-ignore
                .attr("x", d => x(d.hour))
                .attr("y", d => y(+d["Weekday"] / 5))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(+d["Weekday"] / 5))
                .attr("fill", "#0039A6")


            d3.select(weekRef[1].current)
                .selectAll(`${week[1]}bars`)
                .data(data)
                .enter()
                .append("rect")
                              // @ts-ignore
                .attr("x", d => x(d.hour))
                .attr("y", d => y(+d["Weekend"] / 2))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(+d["Weekend"] / 2))
                .attr("fill", "#0039A6")

        })





    })

    return (
        <div className='m-auto p-[20px] w-[90vw] h-[100vh]'>
            <div className='relative'>
                <div className='absolute bottom-[-30px] left-[10px] font-semibold text-[#0039A6]'>Weekday</div>
                <svg className=' w-full h-[calc((100vh-80px)/2)]' ref={weekdayRef}></svg>
            </div>
            <div className='relative'>
                <div className='absolute bottom-[-30px] left-[10px] font-semibold text-[#0039A6]'>Weekend</div>
                <svg className=' w-full h-[calc((100vh-80px)/2)]' ref={weekendRef}></svg>
            </div>
        </div>
    )
}

export default WeekHourRiderships