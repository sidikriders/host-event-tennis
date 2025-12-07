import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Host Event Tennis
        </h1>
        <p className="text-gray-600 text-center mb-8">
          React + Vite + TypeScript + Tailwind + Firebase
        </p>
        
        <div className="bg-indigo-50 rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-700 mb-4 text-center">
            Counter: <span className="font-bold text-indigo-600">{count}</span>
          </p>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Increment Counter
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Basic setup complete! Ready for development.</p>
        </div>
      </div>
    </div>
  )
}

export default App
