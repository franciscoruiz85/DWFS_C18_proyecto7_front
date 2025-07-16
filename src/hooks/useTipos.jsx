import { useState, useEffect } from "react"

const useTipos = () => {
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const typesData = await import('../tipos.json').then(module => module.default)
        
        setTipos(typesData)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { tipos, loading }
};

export default useTipos
