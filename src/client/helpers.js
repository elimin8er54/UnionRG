export const loadImage = (path) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => { resolve() }
        img.onerror = () => { reject() }
        img.src = path;
    })
}

export const loadImages = (paths) => {
    return Promise.all(paths.map(loadImage));
}