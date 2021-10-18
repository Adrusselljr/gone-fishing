const prompt = require("prompt-sync")({ sigint: true })
const chalk = require("chalk")

console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.")
console.log("")
console.log(chalk.whiteBright("=========================================="))
console.log("")

let fishKept = []
let hour = 6.00
let amountOfChum = 0
let chance = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

while(true) {

    function lucky() {
        return chance[Math.ceil(Math.random() * chance.length - 1)]
    }
    let num

    let name = ""
    let weight = 0
    let value = 0

    if(hour >= 12.00) {

        console.log(`The time is ${Number(hour.toFixed(2))}pm.  Times up!`)
        console.log("")
        console.log(`You caught ${fishKept.length} fish:`)

        for(let i = 0; i < fishKept.length; i++) {

            console.log(chalk.yellow(`* ${fishKept[i].name}, ${fishKept[i].weight} lbs, $${fishKept[i].value}`))
            weight += fishKept[i].weight
            value += fishKept[i].value

        }
        console.log("")
        console.log("Total weight:", chalk.yellow(`${Number(weight.toFixed(2))} lbs`))
        console.log("Total weight:", chalk.yellow(`$${Number(value.toFixed(2))}`))
        break

    }
    else {

        if(amountOfChum > 0) {
            console.log(`The Time is ${Number(hour.toFixed(2))}am.  So far you've caught:`)
            console.log(display())
            console.log(`You have ${chalk.yellow(amountOfChum)} minutes of chum remaining!`)
        }
        else {
            console.log(`The Time is ${Number(hour.toFixed(2))}am.  So far you've caught:`)
            console.log(display())
        }

    }

    function display() {

        for(let i = 0; i < fishKept.length; i++) {
            name = fishKept[i]
            weight += fishKept[i].weight
            value += fishKept[i].value
        }
        return `${chalk.yellow(fishKept.length)} fish, ${chalk.yellow(Number(weight.toFixed(2)))} lbs, ${chalk.yellow('$' + Number(value.toFixed(2)))}`

    }
    console.log("")

    function generateRandomFish() {

        num = lucky()
    
        const fish = {
            name: "",
            weight: 0,
            value: 0,
            time: 0
        }
        
        const fishAdj1 = ["Slimy", "Grey", "Purple", "Deepsea", "Tropical", "Slippery", "Tasteless", "Large", "Vicious", "Sharp-jawed"]
        const fishAdj2 = ["Scaly", "Finned", "Bottom-dwelling", "Bigmouthed", "Smallmouthed", "Pickled", "Poisonous", "Red-bellied", "Freshwater", "Ferocious"]
        const fishType = ["Blobfish", "Bass", "Salmon", "Herring", "Angler", "Carp", "Guppy", "Goldfish", "Northern Pike", "Catfish"]
        const time = [0.15, 0.25, 0.50, 0.75]
    
        if(num === 7) {
            console.log(chalk.bgMagenta(chalk.black("CONGRADULATIONS, YOU FOUND IT!")))
            fish.name = "Golden Doubloon"
            fish.weight = Math.ceil(Math.random() * 1000) / 100
            fish.value = 100.00
            fish.time = time[Math.ceil(Math.random() * time.length - 1)]
        }
        else if(num === 0) {
            console.log(chalk.bgMagenta(chalk.black("OOPS!!")))
            fish.name = "Valueless Boot"
            fish.weight = Math.ceil(Math.random() * 1000) / 100
            fish.value = 0.00
            fish.time = time[Math.ceil(Math.random() * time.length - 1)]
        }
        else {
            fish.name = `${fishAdj1[Math.ceil(Math.random() * fishAdj1.length - 1)]} ${fishAdj2[Math.ceil(Math.random() * fishAdj2.length - 1)]} ${fishType[Math.ceil(Math.random() * fishType.length - 1)]}`
            fish.weight = Math.ceil(Math.random() * 1000) / 100
            fish.value = Math.ceil(Math.random() * 1000) / 100
            fish.time = time[Math.ceil(Math.random() * time.length - 1)]
        }
    

        if(amountOfChum > 0) {
            fish.time = time[Math.ceil(Math.random() * time.length - 1)] / 2
        }
        else {
            fish.time = time[Math.ceil(Math.random() * time.length - 1)]
        }

        
        console.log(`You caught a '${chalk.yellow(fish.name)}' weighing ${chalk.yellow(fish.weight)} lbs with a value of ${chalk.yellow('$' + fish.value)}, and took ${chalk.yellow(fish.time)} hours!`)
    
        return fish
    
    }
    const fish = generateRandomFish()

    if(fish.weight + weight > 10) {

        console.log("")
        console.log("This fish will put you over your 10 lbs, so you release it")
        console.log("")
        console.log("Press [enter] to continue.")
        prompt()
        console.log(chalk.whiteBright("=========================================="))

    }
    else {

        console.log("")
        if(fishKept.length > 0){
            console.log(`Your action: ${chalk.green("[c]atch")} or ${chalk.red("[r]elease")} or ${chalk.blueBright("chum [w]ater")} ?`)
            // console.log(`${chalk.blue("[l]ivewell")}`)
        }
        else {
            console.log(`Your action: ${chalk.green("[c]atch")} or ${chalk.red("[r]elease")} or ${chalk.blueBright("chum [w]ater")} ?`)
        }
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
        if(choice === "w") {
            amountOfChum = 25
            console.log("")
            console.log("You chose to chum the water.")
            console.log("This took 0.50 hours!")
            console.log("")
            console.log(chalk.whiteBright("=========================================="))
            console.log("")
        }
        // if(choice === "l") {
        //     console.log("")
        //     console.log("You chose to look in your livewell.")
        //     console.log("")
        //     console.log("Here are your fish:")
        //     for(let i = 0; i < fishKept.length; i++) {
        //         console.log(chalk.yellow(`${i + 1} ${fishKept[i].name}, ${fishKept[i].weight} lbs, $${fishKept[i].value}`))
        //     }
        //     console.log("")
        //     console.log(chalk.whiteBright("=========================================="))
        // }

    }

    hour += fish.time
    amountOfChum -= 5

}