const speciesIcons = {
    dog: "🐕",
    cat: "🐈",
    bird: "🦜",
    fish: "🐠",
    rabbit: "🐇"
}

function PetCard({ pet }) {
    const icon = speciesIcons[pet.species?.toLowerCase()] || "🐾"

    return (
        <article className="pet-card">
            <div className="pet-avatar pet-avatar-large" aria-hidden="true">{icon}</div>
            <div>
                <h2>{pet.petName}</h2>
                <p className="pet-type">
                    {[pet.species, pet.breed].filter(Boolean).join(" · ")}
                </p>
                {pet.notes && <p className="pet-notes">{pet.notes}</p>}
            </div>
        </article>
    )
}

export default PetCard
