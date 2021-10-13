const prompt = require("prompt-sync")({ sigint: true })
const chalk = require("chalk")

console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.")

console.log("==========================================")


function generateRandomFish() {

    const fish = {
        name: "",
        weight: 0,
        value: 0
    }
    
    const fishAdj1 = ["Slimy", "Grey", "Purple", "Deepsea", "Tropical", "Slippery", "Tasteless", "Large", "Vicious", "Sharp-jawed"]
    const fishAdj2 = ["Scaly", "Finned", "Bottom-dwelling", "Bigmouthed", "Smallmouthed", "Pickled", "Poisonous", "Red-bellied", "Freshwater", "Ferocious"]
    const fishType = ["Blobfish", "Bass", "Salmon", "Herring", "Angler", "Carp", "Guppy", "Goldfish", "Northern Pike", "Catfish"]

    fish.name = `${fishAdj1[Math.ceil(Math.random() * fishAdj1.length - 1)]} ${fishAdj2[Math.ceil(Math.random() * fishAdj2.length - 1)]} ${fishType[Math.ceil(Math.random() * fishType.length - 1)]} `

    fish.weight = Math.ceil(Math.random() * 1000) / 100

    fish.value = Math.ceil(Math.random() * 1000) / 100
    
    console.log(`You caught a '${fish.name}' weighing ${fish.weight} lbs with a value of $${fish.value}!`)

    return fish

}
generateRandomFish()