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

        const highlight = "rgba(50, 50, 50, .3)"

        d3.csv("/data/week_hour_ridership.csv").then(data => {
            const x = d3.scaleBand().range([0, width]).domain(data.map(d => d.hour)).padding(0.2)
            const y = d3.scaleLinear().domain([0, 12000000]).range([height, 0])

            d3.select(weekRef[0].current)
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


            d3.select(weekRef[0].current)
                .append("line")
                .style("stroke", highlight)
                .style("stroke-width", 1.25)
                .style("stroke-dasharray", ("3, 3"))
                // @ts-ignore
                .attr("x1", x("6"))
                .attr("y1", 0)
                // @ts-ignore
                .attr("x2", x("6"))
                .attr("y2", height);

            d3.select(weekRef[0].current)
                .append("line")
                .style("stroke", highlight)
                .style("stroke-width", 1.25)
                .style("stroke-dasharray", ("3, 3"))
                // @ts-ignore
                .attr("x1", x("10") + 1 * x.bandwidth())
                .attr("y1", 0)
                // @ts-ignore
                .attr("x2", x("10") + 1 * x.bandwidth())
                .attr("y2", height);

            d3.select(weekRef[0].current)
                .append("line")
                .style("stroke", highlight)
                .style("stroke-width", 1.25)
                .style("stroke-dasharray", ("3, 3"))
                // @ts-ignore
                .attr("x1", x("15"))
                .attr("y1", 0)
                // @ts-ignore
                .attr("x2", x("15"))
                .attr("y2", height);

            d3.select(weekRef[0].current)
                .append("line")
                .style("stroke", highlight)
                .style("stroke-width", 1.25)
                .style("stroke-dasharray", ("3, 3"))
                // @ts-ignore
                .attr("x1", x("18") + 1 * x.bandwidth())
                .attr("y1", 0)
                // @ts-ignore
                .attr("x2", x("18") + 1 * x.bandwidth())
                .attr("y2", height);


            d3.select(weekRef[1].current)
                .selectAll(`weekendbars`)
                .data(data)
                .enter()
                .append("rect")
                // @ts-ignore
                .attr("x", d => x(d.hour))
                .attr("y", d => y(+d["Weekend"] / 2))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(+d["Weekend"] / 2))
                .attr("fill", "#0039A6")

            d3.select(weekRef[1].current)
                .append("line")
                .style("stroke", highlight)
                .style("stroke-width", 1.25)
                .style("stroke-dasharray", ("3, 3"))
                // @ts-ignore
                .attr("x1", x("6"))
                .attr("y1", 10)
                // @ts-ignore
                .attr("x2", x("6"))
                .attr("y2", height);

            d3.select(weekRef[1].current)
                .append("line")
                .style("stroke", highlight)
                .style("stroke-width", 1.25)
                .style("stroke-dasharray", ("3, 3"))
                // @ts-ignore
                .attr("x1", x("18") + 1 * x.bandwidth())
                .attr("y1", 10)
                // @ts-ignore
                .attr("x2", x("18") + 1 * x.bandwidth())
                .attr("y2", height);


        })





    })

    return (
        <div className='m-auto p-[20px] w-[90vw] h-[100vh]'>
            <div className='flex justify-between items-end  h-[8vh]'>
                <div>
                    <div className='font-semibold text-[30px] text-[#0039A6]'>Weekday and Weekend Total Hours Ridership By Hours</div>
                    <div className='mt-[3px] mb-[5px] font-regular text-[#323232]'>Comparison of weekday and weekend total riderships in NYC devided by hours</div>
                </div>
                <div className='flex items-center gap-[5px]'>
                    <div className='w-[20px] h-[10px] bg-[#0039A6]'></div>
                    <div className='my-[5px] font-regular text-[12px] text-[#323232]'>Riderships</div>
                </div>
            </div>
            <div className='relative mt-[25px]'>
                <div className='absolute bottom-[-40px] left-[10px] font-semibold text-[#0039A6]'>Weekday</div>
                <div className={`absolute bottom-[-16px] left-[25px] font-semibold text-[10px] text-[#323232]`}>0:00</div>
                <div className={`absolute bottom-[-16px] left-[400px] font-semibold text-[10px] text-[#323232]`}>6:00</div>
                <div className={`absolute bottom-[-16px]  left-[775px] font-semibold text-[10px] text-[#323232]`}>12:00</div>
                <div className={`absolute bottom-[-16px] left-[1150px] font-semibold text-[10px] text-[#323232]`}>18:00</div>
                <svg className=' w-full h-[calc((80vh)/2)]' ref={weekdayRef}></svg>
            </div>
            <div className='relative'>
                <div className='absolute bottom-[-40px] left-[10px] font-semibold text-[#0039A6]'>Weekend</div>
                <div className={`absolute bottom-[-16px] left-[25px] font-semibold text-[10px] text-[#323232]`}>0:00</div>
                <div className={`absolute bottom-[-16px] left-[400px] font-semibold text-[10px] text-[#323232]`}>6:00</div>
                <div className={`absolute bottom-[-16px]  left-[775px] font-semibold text-[10px] text-[#323232]`}>12:00</div>
                <div className={`absolute bottom-[-16px] left-[1150px] font-semibold text-[10px] text-[#323232]`}>18:00</div>
                <svg className=' w-full h-[calc((80vh)/2)]' ref={weekendRef}></svg>
            </div>
        </div>
    )
}

export default WeekHourRiderships