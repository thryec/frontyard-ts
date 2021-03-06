import Header from './header'
import Footer from './footer'
import 'tailwindcss/tailwind.css'

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-sand">
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
