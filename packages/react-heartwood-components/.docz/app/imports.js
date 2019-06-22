export const imports = {
  'src/components/Button/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-button-button" */ 'src/components/Button/Button.mdx'
    ),
  'src/components/ButtonGroup/ButtonGroup.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-button-group-button-group" */ 'src/components/ButtonGroup/ButtonGroup.mdx'
    ),
}
