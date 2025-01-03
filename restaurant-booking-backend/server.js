import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for bookings (replace with a database in production)
let bookings = [];

// Create a booking
app.post('/api/bookings', (req, res) => {
  const booking = {
    id: Date.now().toString(),
    ...req.body
  };
  bookings.push(booking);
  console.log('Booking created:', booking);
  res.status(201).json(booking);
});

// Get all bookings or bookings for a specific date
app.get('/api/bookings', (req, res) => {
  const { date } = req.query;
  if (date) {
    const filteredBookings = bookings.filter(booking => booking.date === date);
    console.log(`Fetched bookings for date ${date}:`, filteredBookings);
    res.json(filteredBookings);
  } else {
    console.log('Fetched all bookings:', bookings);
    res.json(bookings);
  }
});

// Delete a booking
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const index = bookings.findIndex(booking => booking.id === id);
  if (index !== -1) {
    const deletedBooking = bookings.splice(index, 1)[0];
    console.log('Booking deleted:', deletedBooking);
    res.json({ message: 'Booking deleted successfully' });
  } else {
    console.log('Booking not found for deletion:', id);
    res.status(404).json({ message: 'Booking not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Simulate some bookings for demonstration
const sampleBookings = [
  { id: '1', date: '2023-07-01', time: '18:00', guests: 2, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  { id: '2', date: '2023-07-01', time: '19:30', guests: 4, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
  { id: '3', date: '2023-07-02', time: '20:00', guests: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '1122334455' }
];

bookings.push(...sampleBookings);
console.log('Sample bookings added:', sampleBookings);

// Instead of manually simulating API calls, test these routes using a tool like Postman or Insomnia.
