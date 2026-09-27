declare module "*.asset.json" {
  const asset: { url: string };
  export default asset;
}
declare module "*.css?url" {
  const url: string;
  export default url;
}
