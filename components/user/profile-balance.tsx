"use client"

import { useSwitchNetwork } from "wagmi"

export default function ProfileBalance({ loading, balance, token, active}: { loading: boolean, balance: string, token: any, active: boolean }) {
  const { switchNetwork } =
  useSwitchNetwork()

    return (
      <div className={`bg-background-layer-1 flex flex-row items-center justify-between gap-4 p-4 px-8 rounded-sm outline outline-border-div 
      ${active && 'border-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'} ${!active && 'cursor-pointer'}`} 
      onClick={() => {if(!active){ switchNetwork?.(token.id)}}}>
        <div className="flex flex-col">
          <span className="text-md  text-primary font-medium capitalize">{token.name}</span>
          <span className={`text-text-secondary tracking-wider font-light `}>{loading ? "loading" : Math.floor(Number(balance) * 1000000)/1000000}</span>
        </div>
        <div>
          <div className={`border rounded-full w-5 h-5 flex justify-center items-center ${active && 'border-accent-primary'} `}>
            {active && <div className="rounded-full w-3 h-3 bg-accent-primary"></div>}
          </div>
        </div>
      </div>
  
    )
  }