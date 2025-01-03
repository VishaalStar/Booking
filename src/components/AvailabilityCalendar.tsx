'use client'

import { useState, useEffect } from 'react'
import { format, isSameDay } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'

type Booking = {
  id: string
  date: string
  time: string
  guests: number
}

export default function AvailabilityCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (date) {
      fetchBookings(date)
    }
  }, [date])

  async function fetchBookings(date: Date) {
    setLoading(true)
    setError(null)
    try {
      const apiUrl = `/api/bookings?date=${format(date, 'yyyy-MM-dd')}`
      console.log('Fetching bookings from:', apiUrl)
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from API')
      }
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  function getDayBookings(day: Date) {
    return bookings.filter(booking => isSameDay(new Date(booking.date), day))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border"
          components={{
            DayContent: (props) => {
              const dayBookings = getDayBookings(props.date)
              return (
                <div className="relative w-full h-full">
                  {props.date.getDate()}
                  {dayBookings.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute bottom-0 right-0 -mr-1 -mb-1"
                    >
                      {dayBookings.length}
                    </Badge>
                  )}
                </div>
              )
            },
          }}
        />
        {date && (
          <div className="mt-4">
            <h3 className="font-semibold">Bookings for {format(date, 'PPP')}:</h3>
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Loading bookings...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : bookings.length > 0 ? (
              <ul className="list-disc list-inside">
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    {booking.time} - {booking.guests} guests
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings for this date.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

