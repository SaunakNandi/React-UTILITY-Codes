export const useTraverseTree = () => {
  function insertNode(tree, folderId, name, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, name, isFolder);
    });
    return { ...tree, items: latestNode };
  }
  return { insertNode };
};
