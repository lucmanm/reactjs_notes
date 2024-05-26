// this function take initial of full name
export const getInitials = (name: string | null | undefined): string =>
    name
        ? name
            .split(" ")
            .slice(0, 2)
            .map(word => word[0])
            .join("")
            .toUpperCase()
        : "";
