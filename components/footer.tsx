import 'tailwindcss/tailwind.css'

const Footer = () => {
    let footnote = " © Copyright " + new Date().getFullYear() + ", backyard";
    return (
    <footer className='font-OpenSans text-white h-10 bg-forestgreen border-t-2 border-gray-300 flex flex-col items-center text-center py-1.5' >
        <p>{footnote}</p>
    </footer>
        )
};

export default Footer;