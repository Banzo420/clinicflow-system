import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function WaitingRoom() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: true })

      if (!error) setPatients(data)
    }

    fetchPatients()

    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchPatients, 5000)
    return () => clearInterval(interval)
  }, [])

  const getColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-300 text-black'
      case 'Done':
        return 'bg-green-300 text-black line-through'
      default:
        return 'bg-white'
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Clinic Queue Display</h1>
      <ul className="space-y-4 max-w-2xl mx-auto">
        {patients.map((p) => (
          <li
            key={p.id}
            className={`p-4 rounded shadow-md ${getColor(p.status)} transition-all`}
          >
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-sm">Status: {p.status || 'Waiting'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WaitingRoom
