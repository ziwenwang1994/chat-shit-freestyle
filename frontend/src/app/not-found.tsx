import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='font-inter text-center p-8'>
      <h2 className='text-xl font-bold'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className='bg-emerald-700 text-white inline-block py-1 px-2 rounded mt-4' href="/">Return Home</Link>
    </div>
  )
}