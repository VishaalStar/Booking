import { NextResponse } from 'next/server'

// Define a type for bookings
type Booking = {
  id: string
  date: string
  time: string
  guests: number
}

// Mock database for bookings with updated dates and times
let bookings: Booking[] = [
  { id: '1', date: '2025-01-04', time: '18:00', guests: 2 },
  { id: '2', date: '2025-01-04', time: '19:30', guests: 4 },
  { id: '3', date: '2025-01-05', time: '20:00', guests: 3 },
]

// GET endpoint: Fetch bookings by date or return all bookings
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  console.log('Received GET request for date:', date)

  if (date) {
    const filteredBookings = bookings.filter((booking) => booking.date === date)
    console.log('Filtered bookings:', filteredBookings)
    return NextResponse.json(filteredBookings)
  }

  console.log('Returning all bookings:', bookings)
  return NextResponse.json(bookings)
}

// POST endpoint: Add a new booking
export async function POST(request: Request) {
  try {
    const booking = await request.json()

    // Validate the booking payload
    if (!booking.date || !booking.time || typeof booking.guests !== 'number') {
      return NextResponse.json(
        { message: 'Invalid booking data' },
        { status: 400 }
      )
    }

    booking.id = Date.now().toString() // Generate a unique ID
    bookings.push(booking)
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error processing POST request:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE endpoint: Remove a booking by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    bookings = bookings.filter((booking) => booking.id !== id)
    return NextResponse.json({ message: 'Booking deleted' }, { status: 200 })
  }

  return NextResponse.json(
    { message: 'Booking ID is required' },
    { status: 400 }
  )
}
