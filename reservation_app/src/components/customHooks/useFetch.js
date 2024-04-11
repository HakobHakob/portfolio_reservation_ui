import { useEffect, useState } from "react"
import axios from "axios"

export const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

       // Introduce a delay of 2 seconds (for demonstration purposes)
      //  await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        const response = await axios.get(url)
        setData(response.data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, []) //[url] if we want update our search data immediately

  const reFetch = async () => {
    setLoading(true)

    try {
      const response = await axios.get(url)
      setData(response.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  return { data, loading, error, reFetch }
}
