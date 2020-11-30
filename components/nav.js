import Link from 'next/link'

const links = [
  { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
  { href: 'https://nextjs.org/docs', label: 'Docs' },
]

export default function Nav() {
  return (
    <nav className="bg-green-700"> 
      <ul className="flex justify-between items-center p-8">
        <ul className="flex justify-between items-center space-x-4">
          <li>
            <Link href="/">
              <a className="text-white no-underline">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/usuarios">
              <a className="text-white no-underline ">Usuários</a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  )
}
