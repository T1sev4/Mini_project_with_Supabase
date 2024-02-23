import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmothieCard";
const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  const handleDelete = (smoothieId) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(smoothie => smoothie.id !== smoothieId)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const {data, error} = await supabase.from("smoothies").select()
      if (error) {
        setFetchError('could not fetch smoothies')
        setSmoothies(null)
        console.log(error)
      } 
      if(data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, [])
  

  return (
    <div className="page home">
      {fetchError && (
        <p className="error">
          {fetchError}
        </p>
      )}
      {smoothies && (
        <div className="smoothies">
         <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
            ))}
         </div>
      
        </div>
      )}
    </div>
  )
}

export default Home