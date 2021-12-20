const Footer = () => {
    let footnote = "Copyright © " + new Date().getFullYear() + ", BACKDOOR";
    return (
    <footer>
        <p>{footnote}</p>
    </footer>
        )
};

export default Footer;