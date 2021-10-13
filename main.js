const prompt = require("prompt-sync")({ sigint: true })
const chalk = require("chalk")

console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.")
console.log("")
console.log(chalk.whiteBright("=========================================="))
console.log("")

let fishKept = []
let hour = 6

while(hour <= 12) {

    let name = ""
    let weight = 0
    let value = 0

    if(hour === 12) {

        console.log(`The time is ${hour}:00pm.  Times up!`)
        console.log("")
        console.log(`You caught ${fishKept.length} fish:`)

        for(let i = 0; i < fishKept.length; i++) {

            console.log(`* ${fishKept[i].name}, ${fishKept[i].weight} lbs, $${fishKept[i].value}`)
            weight += fishKept[i].weight
            value += fishKept[i].value

        }
        console.log("")
        console.log(`Total weight: ${weight}`)
        console.log(`Total value: $${value}`)
        break

    }
    else {

        console.log(`The Time is ${hour}:00am.  So far you've caught:`)
        console.log(display())

    }

    function display() {

        for(let i = 0; i < fishKept.length; i++) {
            name = fishKept[i]
            weight += fishKept[i].weight
            value += fishKept[i].value
        }
        return `${fishKept.length} fish, ${weight.toFixed(Number(2))} lbs, $${value.toFixed(Number(2))}`

    }
    console.log("")

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
        
        console.log(`You caught a '${chalk.yellow(fish.name)}' weighing ${chalk.yellow(fish.weight)} lbs with a value of $${chalk.yellow(fish.value)} !`)
    
        return fish
    
    }
    const fish = generateRandomFish()

    if(fish.weight + weight > 10) {

        console.log("")
        console.log("This fish will put you over your 10 lbs, so you release it")
        console.log("")
        console.log("Press [enter] to continue.")
        prompt()

    }
    else {

        console.log("")
        console.log(`Your action: ${chalk.green("[c]atch")} or ${chalk.red("[r]elease")} ?`)
        const choice = prompt()

        if(choice === "c") {
            fishKept.push(fish)
            console.log("")
            console.log("You chose to keep the fish.")
            console.log("")
            console.log(chalk.whiteBright("=========================================="))
            console.log("")
        }
        if(choice === "r") {
            console.log("")
            console.log("You chose to release the fish.")
            console.log("")
            console.log(chalk.whiteBright("=========================================="))
            console.log("")
        }

    }

    hour++

}