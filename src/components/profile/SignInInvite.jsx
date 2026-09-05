import { LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { signInInvite } from '../../data/profile'
import { Button } from '../ui/Button'
import { Frame } from '../ui/Frame'

/**
 * Lo que ve quien abre /perfil sin sesión.
 *
 * No se redirige a la portada: un enlace guardado en marcadores o compartido no
 * debe parecer roto, y el modal de acceso ya existe — basta con abrirlo desde
 * aquí. Al entrar, la página se rellena sola sin más navegación.
 */
export function SignInInvite() {
  const { openAuth } = useAuth()

  return (
    <section className="px-gutter py-[clamp(56px,8vw,110px)]">
      <Frame
        markClass="text-gold"
        className="mx-auto max-w-[520px] border-buck/45 bg-panel px-[clamp(22px,4vw,38px)] py-[clamp(30px,4vw,44px)] text-center"
      >
        <span className="block text-[11px] tracking-kicker text-buck uppercase">
          {signInInvite.kicker}
        </span>

        <h1 className="mt-3 font-display text-h3 font-normal text-paper">{signInInvite.title}</h1>

        <p className="mx-auto mt-4 max-w-[38ch] text-[14px] leading-[1.6] text-sand">
          {signInInvite.body}
        </p>

        <Button onClick={() => openAuth('login')} className="mt-7 px-[26px] py-[13px]">
          <LogIn size={15} strokeWidth={1.5} />
          {signInInvite.action}
        </Button>
      </Frame>
    </section>
  )
}
