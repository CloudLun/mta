"use client"
import React, { useRef, useEffect, useState } from 'react'

import * as d3 from "d3"


const StationDaysHourRiderships = () => {

  // const index = Array.from(Array(7).keys())


  const monRef = useRef<SVGSVGElement | null>(null)
  const tueRef = useRef<SVGSVGElement | null>(null)
  const wedRef = useRef<SVGSVGElement | null>(null)
  const thuRef = useRef<SVGSVGElement | null>(null)
  const friRef = useRef<SVGSVGElement | null>(null)
  const satRef = useRef<SVGSVGElement | null>(null)
  const sunRef = useRef<SVGSVGElement | null>(null)

  const daysRef = [monRef, tueRef, wedRef, thuRef, friRef, satRef, sunRef]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


  const totalPromise = d3.csv("/data/days_hour_ridership.csv")
  const nPromise = d3.csv("/data/n_line_day_hour_ridership.csv")
  const qPromise = d3.csv("/data/q_line_day_hour_ridership.csv")
  const rPromise = d3.csv("/data/r_line_day_hour_ridership.csv")
  const lPromise = d3.csv("/data/l_line_day_hour_ridership.csv")
  const sPromise = d3.csv("/data/s_line_day_hour_ridership.csv")
  const onePromise = d3.csv("/data/one_line_day_hour_ridership.csv")
  const twoPromise = d3.csv("/data/two_line_day_hour_ridership.csv")
  const threePromise = d3.csv("/data/three_line_day_hour_ridership.csv")
  const fourPromise = d3.csv("/data/four_line_day_hour_ridership.csv")
  const fivePromise = d3.csv("/data/five_line_day_hour_ridership.csv")
  const sixPromise = d3.csv("/data/six_line_day_hour_ridership.csv")
  const sevenPromise = d3.csv("/data/seven_line_day_hour_ridership.csv")
  const aPromise = d3.csv("/data/a_line_day_hour_ridership.csv")
  const cPromise = d3.csv("/data/c_line_day_hour_ridership.csv")
  const ePromise = d3.csv("/data/e_line_day_hour_ridership.csv")
  const bPromise = d3.csv("/data/b_line_day_hour_ridership.csv")
  const dPromise = d3.csv("/data/d_line_day_hour_ridership.csv")
  const fPromise = d3.csv("/data/f_line_day_hour_ridership.csv")
  const mPromise = d3.csv("/data/m_line_day_hour_ridership.csv")
  const gPromise = d3.csv("/data/g_line_day_hour_ridership.csv")
  const jPromise = d3.csv("/data/j_line_day_hour_ridership.csv")
  const zPromise = d3.csv("/data/z_line_day_hour_ridership.csv")



  useEffect(() => {



    const height = monRef.current!.clientHeight
    const width = monRef.current!.clientWidth

    Promise.all([totalPromise, nPromise, qPromise, rPromise, lPromise, sPromise, onePromise, twoPromise, threePromise, fourPromise, fivePromise, sixPromise, sevenPromise, aPromise, cPromise, ePromise, bPromise, dPromise, mPromise, fPromise, gPromise, jPromise, zPromise]).then((datasets) => {

      const lines = ['total', 'N', "Q", "R", 'L', "S", '1', "2", "3", "4", "5", '6', '7', 'A', "C", "E", "B", "D", "F", 'M', 'G', 'J', "Z"]
      const totalData = datasets[0]

      const x = d3.scaleBand().range([0, width]).domain(totalData.map(d => d.hour)).padding(0.2)
      const y = d3.scaleLinear().domain([0, 3600000]).range([height, 0])

      const line_colors = {
        total: "#eee",
        "N": "#fccc0a",
        "Q": "#fccc0a",
        "R": "#fccc0a",
        "L": "#A7A9AC",
        "S": "#808183",
        "1": "#EE352E",
        "2": "#EE352E",
        "3": "#EE352E",
        "4": "#00933C",
        "5": "#00933C",
        "6": "#00933C",
        "7": "#B933AD",
        "A": "#0039A6",
        "C": "#0039A6",
        "E": "#0039A6",
        "B": "#FF6319",
        "D": "#FF6319",
        "F": "#FF6319",
        "M": "#FF6319",
        "G": "#6CBE45",
        "J": "#996633",
        "Z": "#996633",
      }




      const highlight = "#eee"


      days.forEach((d, i) => {

        // if (i < 5) {
        //   d3.select(daysRef[i].current)
        //     .append('rect')
        //     .attr("x", x("5") - 0.1 * x.bandwidth())
        //     .attr("y", y(15000000))
        //     .attr("width", x.bandwidth() * 6.2)
        //     .attr("height", height)
        //     .attr("fill", highlight)
        //     .attr("opacity", 1)

        //   d3.select(daysRef[i].current)
        //     .append('rect')
        //     .attr("x", x("14") - 0.1 * x.bandwidth())
        //     .attr("y", y(15000000))
        //     .attr("width", x.bandwidth() * 6.2)
        //     .attr("height", height)
        //     .attr("fill", highlight)
        //     .attr("opacity", 1)
        // }

        // if (i > 4) {
        //   d3.select(daysRef[i].current)
        //     .append('rect')
        //     .attr("x", x("10") - 0.1 * x.bandwidth())
        //     .attr("y", y(15000000))
        //     .attr("width", x.bandwidth() * 10)
        //     .attr("height", height)
        //     .attr("fill", highlight)
        //     .attr("opacity", 1)
        // }


        // d3.select(daysRef[i].current)
        //   .selectAll(`${days[i]}bars`)
        //   .data(datasets[0])
        //   .enter()
        //   .append("rect")
        //   .attr("x", d => x(d.hour))
        //   .attr("y", d => y_total(+d[days[i]]))
        //   .attr("width", x.bandwidth())
        //   .attr("height", d => height - y(+d[days[i]]))
        //   .attr("fill", "#0039A6")




        lines.forEach((l, j) => {
          // if (j === 0)
          //   d3.select(daysRef[i].current)
          //     .selectAll(`${days[i]}bars_${l}`)
          //     .data(datasets[j])
          //     .enter()
          //     .append("rect")
          //     .attr("x", d => x(d.hour))
          //     .attr("y", d => y_total(+d[days[i]]))
          //     .attr("width", x.bandwidth())
          //     .attr("height", d => height - y(+d[days[i]]))
          //     .attr("fill", "#0039A6")

          if (l === 'A' || l === 'L' || l === "7" || l === "4" || l === "F")
            // d3.select(daysRef[i].current)
            //   .selectAll(`${days[i]}bars_${l}`)
            //   .data(datasets[j])
            //   .enter()
            //   .append("rect")
            //   .attr("x", d => x(d.hour))
            //   .attr("y", d => y(+d[days[i]]))
            //   .attr("width", x.bandwidth())
            //   .attr("height", d => height - y(+d[days[i]]))
            //   .attr("fill", line_colors[l])

            d3.select(daysRef[i].current)
              .append("path")
              .attr("fill", "none")
              .attr("stroke", line_colors[l])
              .attr("stroke-miterlimit", 1)
              .attr("stroke-width", 3)
              // @ts-ignore
              .attr("d", d3.line().x(d => x(d.hour) + x.bandwidth() / 2).y(d => y(+d[days[i]])).curve(d3.curveBasis)(datasets[j]))

        })







      })
    })
  })

  return (
    <div className='m-auto p-[20px] w-[90vw] h-[100vh]'>
      {
        days.map((d, i) => {
          return (
            <div key={i} className='relative'>
              <div className='absolute bottom-[-30px] left-[10px] font-semibold text-[#0039A6]'>{d}</div>
              <svg className=' w-full h-[calc((100vh-80px)/7)]' ref={daysRef[i]}></svg>
            </div>

          )
        })
      }
    </div>
  )
}

export default StationDaysHourRiderships



// let defs = d3.select(monRef.current).append("defs")

// let gradient = defs.append("linearGradient")
//   .attr("id", "svgGradient")
//   .attr("x1", "0%")
//   .attr("x2", "0%")
//   .attr("y1", "0%")
//   .attr("y2", "100%");

// gradient.append("stop")
//   .attr("class", "start")
//   .attr("offset", "25%")
//   .attr("stop-color", "#0039A6")
//   .attr("stop-opacity", .5);

// gradient.append("stop")
//   .attr("class", "middle")
//   .attr("offset", "50%")
//   .attr("stop-color", "#0039A6")
//   .attr("stop-opacity", .35);

// gradient.append("stop")
//   .attr("class", "middle-1")
//   .attr("offset", "75%")
//   .attr("stop-color", "#0039A6")
//   .attr("stop-opacity", .0125);


// gradient.append("stop")
//   .attr("class", "end")
//   .attr("offset", "100%")
//   .attr("stop-color", "#0039A6")
//   .attr("stop-opacity", .0);