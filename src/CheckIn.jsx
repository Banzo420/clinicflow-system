import { useState } from 'react'
import { supabase } from './supabase'

function CheckIn() {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    const { error } = await supabase.from('patients').insert([
      { name: name.trim(), status: 'Waiting' },
    ])

    if (error) {
      console.error('Error checking in:', error)
      setError('Something went wrong. Please try again.')
    } else {
      setSuccess(true)
      setName('')
      setError(null)
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Patient Check-In</h1>

      {success && (
        <p className="text-green-600 mb-4">
          ✅ You’ve been added to the queue.
        </p>
      )}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Check In
        </button>
      </form>
    </div>
  )
}

export default CheckIn
