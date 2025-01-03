import BookingForm from '@/components/BookingForm'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Restaurant Table Booking</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <BookingForm />
        <AvailabilityCalendar />
      </div>
      <Toaster />
    </main>
  )
}

