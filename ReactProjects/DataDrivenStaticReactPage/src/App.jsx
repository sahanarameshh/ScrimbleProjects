import Header from "./components/Header"
import Entry from "./components/Entry"
import journalData from "./journalData"

export default function App() {
    const journalEntries = journalData.map((entry) => {
        return <Entry 
                    key={entry.id}
                    {...entry}
                />
    })

    return (
        <>
            <Header />
            <main className="container">
                {journalEntries}
            </main>
        </>
    )
}