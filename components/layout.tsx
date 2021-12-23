import Header from "./header";
import Footer from "./footer";
import 'tailwindcss/tailwind.css'

const Layout = ({children}:{children:any}) => {
    return (
        <div className='flex flex-col h-screen justify-between'>
            <Header></Header>
            <main className='mb-auto'>{children}</main>
            <Footer></Footer>
        </div>
    )
};

export default Layout;