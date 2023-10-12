function formatEthAddress(address) {
    if (!address || address.length < 8) {
        return "";
    }

    const firstFive = address.slice(0, 5);
    const lastThree = address.slice(-3);

    return `${firstFive}...${lastThree}`;
}
