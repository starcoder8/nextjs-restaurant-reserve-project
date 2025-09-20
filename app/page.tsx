"use client";

import { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const timeSlots = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'book' | 'manage'>('book');
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      date: '2025-01-15',
      time: '7:00 PM',
      guests: 4,
      specialRequests: 'Birthday celebration',
      status: 'confirmed'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      date: '2025-01-16',
      time: '6:30 PM',
      guests: 2,
      specialRequests: '',
      status: 'pending'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: Reservation = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests),
      specialRequests: formData.specialRequests,
      status: 'confirmed'
    };
    
    setReservations(prev => [...prev, newReservation]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      specialRequests: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Bella Vista</h1>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>123 Main St, City</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Experience Fine Dining</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Reserve your table at Bella Vista and enjoy an unforgettable culinary journey 
            with exceptional service in an elegant atmosphere.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
            onClick={() => setActiveTab('book')}
          >
            Make a Reservation
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <Button
              variant={activeTab === 'book' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('book')}
              className={cn(
                "px-6 py-2 rounded-md font-medium transition-all duration-200",
                activeTab === 'book' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Make Reservation
            </Button>
            <Button
              variant={activeTab === 'manage' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('manage')}
              className={cn(
                "px-6 py-2 rounded-md font-medium transition-all duration-200",
                activeTab === 'manage' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Users className="w-4 h-4 mr-2" />
              Manage Reservations
            </Button>
          </div>
        </div>

        {/* Booking Form */}
        {activeTab === 'book' && (
          <Card className="max-w-2xl mx-auto shadow-lg border-amber-100">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
              <CardTitle className="text-2xl text-center text-gray-900">Reserve Your Table</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Fill out the form below to make your reservation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium text-gray-700">Time</Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-sm font-medium text-gray-700">Guests</Label>
                    <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests" className="text-sm font-medium text-gray-700">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Any dietary restrictions, special occasions, or seating preferences..."
                    className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 min-h-[80px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                  size="lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Confirm Reservation
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reservations Management */}
        {activeTab === 'manage' && (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-amber-100">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
                <CardTitle className="text-2xl text-center text-gray-900">Your Reservations</CardTitle>
                <CardDescription className="text-center text-gray-600">
                  View and manage your upcoming reservations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {reservations.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reservations found</h3>
                    <p className="text-gray-600 mb-6">You don't have any reservations yet.</p>
                    <Button 
                      onClick={() => setActiveTab('book')}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      Make Your First Reservation
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <Card key={reservation.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <h4 className="text-lg font-semibold text-gray-900">{reservation.name}</h4>
                                <Badge className={cn("text-xs font-medium", getStatusColor(reservation.status))}>
                                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{reservation.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{reservation.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{reservation.guests} guests</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Mail className="w-4 h-4" />
                                  <span>{reservation.email}</span>
                                </div>
                              </div>
                              {reservation.specialRequests && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Special requests:</span> {reservation.specialRequests}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                                Modify
                              </Button>
                              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bella Vista</h3>
              <p className="text-gray-300 mb-4">
                Experience exceptional dining in an elegant atmosphere. 
                Reserve your table today for an unforgettable culinary journey.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>reservations@bellavista.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Main Street, City, State 12345</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hours</h4>
              <div className="space-y-1 text-gray-300">
                <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 4:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Bella Vista Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}