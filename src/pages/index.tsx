import { FC, useState } from 'react'
import { useForm } from "react-hook-form"

import { Matrix } from "./components/matrix"

const Home: FC = () => {
  const { register, handleSubmit } = useForm()

  const [showAnswer, setShowAnswer] = useState(false)

  const calculate = (data: any) => {
    console.log(data)
  }

  return (
    <main className="📢">
      <section className="🚧">
        <form className="📝" onSubmit={handleSubmit(calculate)}>
          <input data-position={1} className="🔢" type="text" {...register("matrix1")} />
          
          <button className="🔘">
            <span>x</span>
          </button>

          <input data-position={3} className="🔢" type="text" {...register("matrix2")} />

          <button  className="🔘" onClick={() => setShowAnswer(true)}>Calculate</button>

          {showAnswer ? (
            <Matrix className="📟" results={["a", "b", "c"]} />
          ) : (
            <Matrix className="📟" data-transparent results={[""]} />
          )}
        </form>
      </section>
    </main>
  )
}

export default Home
