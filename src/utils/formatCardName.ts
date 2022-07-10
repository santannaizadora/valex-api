export const formatCardName = (fullName: string) => {
    const names: Array<string> = fullName.toUpperCase().split(' ');
    const middleNames = names.slice(1, names.length - 1).filter(name => name.length > 2);
    let formattedMiddleNames = '';
    middleNames.forEach(name => {
        formattedMiddleNames = `${formattedMiddleNames} ${name.charAt(0)}`;
    });
    const name = `${names[0]} ${formattedMiddleNames.trim()} ${names.at(-1)}`;
    return name;
}