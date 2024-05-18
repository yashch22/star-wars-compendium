

export default function getSpeciesColor(species: string[]): string {


    // Define colors array
    const colors: string[] = [
        "#000033", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF", "#FF0000", "#FF6666",
        "#FF9999", "#FFCCCC", "#FF00FF", "#CC0099", "#9933FF", "#6600FF", "#3300FF", "#0066FF",
        "#0033CC", "#330099", "#6600CC", "#990099", "#CC33CC", "#FF0066", "#CC33FF", "#CC0066",
        "#FF33CC", "#FF66FF", "#990066", "#CC66FF", "#666699", "#FF6666", "#9966FF", "#666666",
        "#FF00FF", "#993366", "#CC66FF", "#9966CC", "#FF3399", "#660099", "#330066", "#996600"
    ];


    if (species.length == 0) {
        // console.log(species)
        return '#000000';
    }

    // Extract species ID from URL
    console.log(species)
    const speciesId: string = species[0].split('/').slice(-2, -1)[0];
    // console.log(species, speciesId)
    return colors[parseInt(speciesId)];

}