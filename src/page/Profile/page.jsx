import { AnnouncementBar } from '../../components/layout/AnnouncementBar'
import { Footer } from '../../components/layout/Footer'
import { Navbar } from '../../components/layout/Navbar'
import { ProfileForm } from '../../components/profile/ProfileForm'
import { ProfileIdentity } from '../../components/profile/ProfileIdentity'
import { SignInInvite } from '../../components/profile/SignInInvite'
import { useAuth } from '../../context/AuthContext'

/**
 * Página de cuenta. La misma cáscara que la portada —anuncio, navbar, footer—;
 * lo único que decide es qué va dentro de `main`.
 *
 * Mientras `status` es 'checking' no se pinta nada de dentro: el arranque de
 * AuthProvider todavía está preguntando al servidor quién es esta persona, y
 * enseñar la invitación a entrar antes de saberlo afirmaría que no hay sesión
 * para desdecirse un instante después. La altura mínima se reserva igual, para
 * que el footer no suba y vuelva a bajar cuando llegue la respuesta.
 */
export default function Profile() {
  const { user, status } = useAuth()

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-[60vh]">
        {status === 'ready' &&
          (user ? (
            <>
              <ProfileIdentity user={user} />
              <ProfileForm user={user} />
            </>
          ) : (
            <SignInInvite />
          ))}
      </main>

      <Footer />
    </div>
  )
}
