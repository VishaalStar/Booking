import { NextResponse } from 'next/server'
import { format } from 'date-fns'

// This would typically be a database
let bookings: any[] = [
  { id: '1', date: '2023-07-01', time: '18:00', guests: 2 },
  { id: '2', date: '2023-07-01', time: '19:30', guests: 4 },
  { id: '3', date: '2023-07-02', time: '20:00', guests: 3 },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  console.log('Received GET request for date:', date)

  if (date) {
    const filteredBookings = bookings.filter(booking => booking.date === date)
    console.log('Filtered bookings:', filteredBookings)
    return NextResponse.json(filteredBookings)
  }

  console.log('Returning all bookings:', bookings)
  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  const booking = await request.json()
  booking.id = Date.now().toString()
  bookings.push(booking)
  return NextResponse.json(booking, { status: 201 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    bookings = bookings.filter(booking => booking.id !== id)
    return NextResponse.json({ message: 'Booking deleted' }, { status: 200 })
  }

  return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 })
}

