import { notFound } from 'next/navigation';

async function fetchModels(makeId, year) {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await response.json();
    
    if (!response.ok || data.Count === 0) {
      return null;
    }
    return data.Results || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function ResultPage({ params }) {
  const { makeId, year } = await params;

  const models = await fetchModels(makeId, year);

  if (!models) {
    notFound();  
  }

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center">
      <h1 className="text-2xl font-bold my-6">Vehicle Models</h1>
      <p className="mb-4">
        Results for <strong>Make ID:</strong> {makeId} and <strong>Year:</strong> {year}
      </p>
      <ul className="w-full h-[300px] max-w-2xl bg-white rounded-md shadow-lg p-4 overflow-auto">
        {models.length > 0 ? (
          models.map((model) => (
            <li key={model.Model_ID} className="border-b p-2 text-gray-500">
              {model.Model_Name}
            </li>
          ))
        ) : (
          <p>No models found for the selected make and year.</p>
        )}
      </ul>
    </div>
  );
}