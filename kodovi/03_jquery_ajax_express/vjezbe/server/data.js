import crypto from "crypto";

export const bio = {
    firstName: "Christoph",
    lastName: "Waltz",
    about: `
        Christoph Waltz (German: [ˈkʁɪstɔf ˈvalts]; born 4 October 1956) is an Austrian, German and American actor. Waltz gained international recognition for his portrayal of villainous and supporting roles in English-language films. His accolades include two Academy Awards, two BAFTAs, and two Golden Globes, as well as a nomination for a Primetime Emmy Award.
        After a substantial career in German television and theatre, Waltz's international breakthrough role came in Quentin Tarantino's 2009 film Inglourious Basterds, in which he played Hans Landa, for which he received the Academy Award for Best Supporting Actor and the Cannes Film Festival Award for Best Actor. He collaborated with Tarantino again in Django Unchained (2012), for which he earned his second Academy Award for Best Supporting Actor, this time for his performance as a bounty hunter named Dr. King Schultz.
    `,
    img: "christoph_waltz.jpg"
}

export const movies = [
    {
        id: crypto.randomUUID(),
        name: "Django Unchained",
        description: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi."
    },
    {
        id: crypto.randomUUID(),
        name: "Inglourious Basterds",
        description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same."
    }
];
