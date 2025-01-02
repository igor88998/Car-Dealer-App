'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [makes, setMakes] = useState([]);
  const [make, setMake] = useState('');
  const [year, setYear] = useState('');
  const [years, setYears] = useState([]);

  useEffect(() => {
    async function fetchMakes() {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      const data = await response.json();
      setMakes(data.Results);
    }
    fetchMakes();

    const currentYear = new Date().getFullYear();
    setYears(Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i));
  }, []);

  const handleNext = () => {
    if (make && year) {
      // Ensure a valid route
      router.push(`/result/${make}/${year}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center">
      <h1 className="text-2xl font-bold my-6">Car Dealer App</h1>
      <div className="flex flex-col space-y-4">
        <select
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="p-2 border rounded text-gray-700"
        >
          <option value="">Select Make</option>
          {makes.map((item) => (
            <option key={item.MakeId} value={item.MakeId}>
              {item.MakeName}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded text-gray-700"
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <button
          onClick={handleNext}
          disabled={!make || !year}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}