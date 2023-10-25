"use client"

import GithubSignIn from "@/components/connections/github/github-signin"


export default function CreateProjectFlow() {
    
    
    //we want to check if the user is logged in with github
  return (
    <div>
        <GithubSignIn />
    </div>
  )
}
