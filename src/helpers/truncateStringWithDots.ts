function truncateStringWithDots(longString: string, maxLength: number): string {
    if (longString.length < maxLength) {
        return longString;
    }

    return longString.slice(0, maxLength) + '...';
}

export default truncateStringWithDots;
