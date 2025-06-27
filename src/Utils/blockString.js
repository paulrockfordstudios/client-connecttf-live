// Takes a user's blocks and turns them into a string

export const blockString = (user) => {
    const flameBlocks = user.flameBlockers.concat(user.flameBlocking);
    const unionBlocks = user.unionBlockers.concat(user.unionBlocking);
    const blocks = flameBlocks.concat(unionBlocks);
    const uniqueBlocks = [...new Set(blocks)];
    const blocksString = uniqueBlocks.toString();
    const blockString = blocksString.length === 0 ? "0" : blocksString;
    return blockString;
};