import { lightGreenTheme, darkGreenTheme } from "./theme"

export function useCardStyle(isDarkMode) {
    return {
        backgroundColor: isDarkMode ? darkGreenTheme.colors.surfaceVariant : lightGreenTheme.colors.surfaceVariant,
		borderRadius: 10,
		elevation: 0, // Height of the shadow
    }
}