'use client';

import { Heart, CreditCard, User } from 'lucide-react';
import { useState } from 'react';

export default function DonateSection() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  });
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const presetAmounts = ['500', '1000', '2000', '5000'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear preset selection when typing custom amount
    if (name === 'amount' && selectedAmount) {
      setSelectedAmount('');
    }
  };

  const handlePresetSelect = (amount: string) => {
    setFormData(prev => ({ ...prev, amount }));
    setSelectedAmount(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log('Donation submitted:', { ...formData, amount: `₹${formData.amount}` });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', amount: '' });
      setSelectedAmount('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const isFormValid = formData.name.trim() && formData.amount.trim();

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 to-white py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-rose-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Donate Now
          </h1>
          <p className="text-gray-600">
            Your contribution makes a difference in a child&apos;s life
          </p>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You, {formData.name}!
              </h3>
              <p className="text-gray-600 mb-6">
                Your donation of ₹{formData.amount} has been recorded.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
              >
                Make Another Donation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Your Name *
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Donation Amount ($) *
                </label>
                
                {/* Preset Amount Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePresetSelect(amount)}
                      className={`py-3 rounded-lg border transition-all ${
                        selectedAmount === amount
                          ? 'bg-rose-50 border-rose-500 text-rose-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount Input */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                    placeholder="Enter custom amount"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full cursor-pointer bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    Donate Now
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}