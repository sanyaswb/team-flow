export function getRandomInt(min: number, max: number, exclude?: number | number[]): number {
	const randomInt = Math.round(min - 0.5 + Math.random() * (max - min + 1));

	if (exclude && typeof exclude === 'number' && exclude === randomInt) {
		return getRandomInt(min, max, exclude);
	} else if (exclude && Array.isArray(exclude) && exclude.includes(randomInt)) {
		return getRandomInt(min, max, exclude);
	}

	return randomInt;
}

export function arrayMix<T>(array: T[]): T[] {
	let j ;
	let temp ;
	const mixedArr = [ ...array ];

	for (let i = mixedArr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random()*(i + 1));

		temp = mixedArr[j];
		mixedArr[j] = mixedArr[i];
		mixedArr[i] = temp;
	}

	return mixedArr;
}

