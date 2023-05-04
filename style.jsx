export function useCardStyle(isDarkMode) {
    return {
        backgroundColor: isDarkMode ? "#212121" : "white",
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		elevation: 10, // Height of the shadow
    }
}

export function useColors() {
    return {
        lightGray: "#DDDDDD"
    }
}