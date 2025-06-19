export default function Entry({imageUrl, country, mapsLink, location, date, description}) {
    return (
        <article className="journal-entry">
            <div className="main-image-container">
                <img 
                    className="main-image"
                    src={imageUrl} 
                    alt={location}
                />
            </div>
            <div className="info-container">
                <span className="country">{country}</span>
                <a href={mapsLink} target="_blank">View on Google Maps</a>
                <h2 className="entry-location">{location}</h2>
                <p className="trip-date">{date}</p>
                <p className="entry-description">{description}</p>
            </div>
            
        </article>
    )
}