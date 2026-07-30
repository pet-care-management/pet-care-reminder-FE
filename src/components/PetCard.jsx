const speciesIcons = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  fish: "🐠",
  rabbit: "🐇",
};

function PetCard({ pet }) {
  const species = pet.species.toLowerCase();
  const petIcon = speciesIcons[species] || "🐾";

  return (
    <article className="pet-card">
      <div className="pet-avatar pet-avatar-large">{petIcon}</div>

      <div>
        <h3>{pet.petName}</h3>

        <p className="pet-details">
          <span className="pet-species">{pet.species}</span>

          {pet.breed && <span className="pet-breed">{pet.breed}</span>}
        </p>

        {pet.notes && <p className="pet-notes">{pet.notes}</p>}
      </div>
    </article>
  );
}

export default PetCard;
