// Returns array containing substrings between consecutive array elements inthis case indices
module.exports = async function(string) {

    //Create array of indices to slice strings between
    const arrayOfindices =  createStringIndicesForLatestStories(string);

    //The indices contain the start and end index of consecutive substrings we need to parse 
    let substrings = [];

    //indices.length-1 is because we have only 6 articles
    for (let i = 0; i < arrayOfindices.length - 1; i++) {
        substrings.push(string.slice(arrayOfindices[i], arrayOfindices[i + 1]))
    }

    return substrings;
}


// Helper function
// Returns array containing starting indices  of strings starting with 'latest-stories__item'
function createStringIndicesForLatestStories(string) {

    //Finding indices of the matched strings
    let regex = /latest-stories__item/g, result, indices = [];

    //Indices - array containing all matching 'latest-stories__item' string
    let counter = 0;
    while ((result = regex.exec(string))) {
        if (counter % 3 === 0) {
            indices.push(result.index);
        }
        //this will contain an array of 18 elements containing latest-stories__item  but we require only every third
        counter = counter + 1
    }
    //since last element does not have end index have added 250 characters as extra
    indices.push(indices[indices.length - 1] + 250)
    return indices;

}