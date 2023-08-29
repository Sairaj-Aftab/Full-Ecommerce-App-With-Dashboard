

// Generate Random Code

export const getRandomCode = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}