interface IResourcesFileContentDataItem {
  $: { [key: string]: string; name: string };
  value: string[];
}

interface IResourcesFileContentRoot {
  data: IResourcesFileContentDataItem[];
}

interface IResourcesFileContent {
  root: IResourcesFileContentRoot;
}

export {
  IResourcesFileContent,
  IResourcesFileContentRoot,
  IResourcesFileContentDataItem,
};
