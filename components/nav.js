import Link from 'next/link'

const links = [
  { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
  { href: 'https://nextjs.org/docs', label: 'Docs' },
]

export default function Nav() {
  return (
    <nav className="bg-blue-900"> 
      <ul className="flex justify-between items-center p-4 max-w-screen-lg   mx-auto">
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
          <li>
            <Link href="/cargos">
              <a className="text-white no-underline ">Cargos</a>
            </Link>
          </li>
          <li>
            <Link href="/perfis">
              <a className="text-white no-underline ">Perfis</a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  )
}
