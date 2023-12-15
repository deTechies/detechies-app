import Link from "next/link"


export default function AdminPage() {
  return (
    <div>
        <h1>Admin Page</h1>
        <p>
            For testing purposes, this page is accessible by only the team. 
        </p>
        <Link href="/admin/question">
            Question
        </Link>
    </div>
  )
}
