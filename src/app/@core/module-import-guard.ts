
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void | never {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
