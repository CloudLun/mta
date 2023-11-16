import Image from 'next/image'

import DaysHourRiderships from '@/components/DaysHourRiderships'
import StationDaysHourRiderships from '@/components/StationDaysHourRiderships'
import WeekHourRiderships from '@/components/WeekHourRiderships'
import WeekAverageRiderships from '@/components/WeekAverageRiderships'


export default function Home() {
  return (
    <div className='bg-white'>
      <DaysHourRiderships />
      <WeekHourRiderships />
      <StationDaysHourRiderships />
      <WeekAverageRiderships />
    </div>
  )
}
