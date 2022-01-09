import 'tailwindcss/tailwind.css'

const Footer = () => {
    let footnote = " © Copyright " + new Date().getFullYear();
    return (
    <footer className='font-Montserrat text-white h-10 bg-footerbg border-t-2 border-gray-300 flex flex-col items-center text-center py-1.5' >
        <p>{footnote}<span className="font-LogoFont">, backyard.</span></p>
    </footer>
        )
};

export default Footer;