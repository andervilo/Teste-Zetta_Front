import Nav from '../components/nav';
import Image from 'next/image';

export default function IndexPage() {
  return (
    <div>
      
      <div className="py-20">
        <div className="content-center text-center">
          <Image src="/images/logo.png" alt="me" width="900" height="273" />
        </div>
        <h1 className="text-5xl text-center text-accent-1">
          Gestão de Usuários
        </h1>
      </div>
    </div>
  )
}
