export default function Main() {
    const ingredients = []

    function  handleSubmit() {}

    return (
        <main>
            <form className="add-ingredient-form" onSubmit={handleSubmit(ingredient)}>
            <input 
                type="text"
                placeholder="e.g. oregano"
                aria-label="Add ingredient"
                name="ingredient"
            />
            <button>Add ingredient</button>
        </form>
        </main>
    )
}