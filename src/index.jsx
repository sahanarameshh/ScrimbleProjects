import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));

root.render(
    <MyFirstPage />
)

function Header() {
    return (
        <header className='header'>
            <img className='image' src='public/assets/react-logo.png' alt='React logo' />
            <nav>
                <ul className='nav-list'>
                    <li className='nav-list-item'>Pricing</li>
                    <li className='nav-list-item'>About</li>
                    <li className='nav-list-item'>Contact</li>
                </ul>
            </nav>
        </header>
    )
}

function Main() {
    return (
        <main>
            <h1>Why am I excited to learn React?</h1>
            <ol>
                <li>I can implement it in future fullstack projects</li>
                <li>I can create dynamic UIs</li>
                <li>I can say I'm a great SWE!</li>
            </ol>
        </main>
    )
}

function Footer() {
    return (
        <footer>
            "© 2025 Ramesh development. All rights reserved."
        </footer>   
    )
}

function MyFirstPage() {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}