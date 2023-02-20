import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {decrement,increment} from "features/counter/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
      <div className="flex items-center justify-center mt-8">
          <button className="w-[100px] border border-amber-400 hover:bg-amber-500 active:bg-amber-800"
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
              className="w-[100px] border border-amber-400 hover:bg-amber-500 active:bg-amber-800"
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
      </div>
  )
}