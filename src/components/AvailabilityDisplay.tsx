'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Booking = {
  id: string
  date: string
  time: string
  guests: number
}

export default function AvailabilityDisplay() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (date) {
      fetchBookings(date)
    }
  }, [date])

  async function fetchBookings(date: Date) {
    try {
      const response = await fetch(`/api/bookings?date=${format(date, 'yyyy-MM-dd')}`)
      if (!response.ok) {
        throw new Error('Failed to fetch bookings')
      }
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date && (
          <div className="mt-4">
            <h3 className="font-semibold">Bookings for {format(date, 'PPP')}:</h3>
            {bookings.length > 0 ? (
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

